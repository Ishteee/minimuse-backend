const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './minimuse.db'
  },
  useNullAsDefault: true
});

const supabaseUrl = 'https://hlldvipbakpspvzkxknj.supabase.co';
const supabaseServiceKey = 'YOUR_SUPABASE_SERVICE_ROLE_KEY'; // <-- PASTE YOUR SERVICE ROLE KEY HERE
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to extract file path from URL
const getPathFromUrl = (url) => {
  if (!url) return null;
  try {
    const pathParts = url.split('/public/');
    if (pathParts.length > 1) {
      const bucketAndPath = pathParts[1];
      return decodeURIComponent(bucketAndPath.substring(bucketAndPath.indexOf('/') + 1));
    }
    return null;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
};

// Create User
router.post('/users', async (req, res) => {
  const { name, role, password, avatar_url } = req.body;
  if (!name || !['creator', 'listener'].includes(role) || !password) {
    return res.status(400).json({ error: 'Name, role, and password are required' });
  }
  try {
    const [id] = await knex('users').insert({ name, role, password, avatar_url });
    res.status(201).json({ id, name, role, avatar_url });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get Users by Name and Password
router.get('/users', async (req, res) => {
  const { name, password } = req.query;
  if (!name || !password) {
    return res.status(400).json({ error: 'Name and password query parameters are required' });
  }
  try {
    const users = await knex('users')
      .where({ name, password })
      .select('id', 'name', 'role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get Creators and Tracks with Subscription Status
router.get('/creators', async (req, res) => {
  const listenerId = parseInt(req.query.listener_id) || null;
  try {
    const creators = await knex('users')
      .where({ role: 'creator' })
      .select(
        'users.id as creator_id',
        'users.name',
        'users.avatar_url',
        knex.raw(`
          (SELECT COUNT(*) 
           FROM subscriptions 
           WHERE subscriptions.creator_id = users.id) as subscriber_count
        `),
        knex.raw(`
          (SELECT COUNT(*) > 0 
           FROM subscriptions 
           WHERE subscriptions.creator_id = users.id 
           AND subscriptions.listener_id = ?) as is_subscribed
        `, [listenerId]),
        knex.raw(`
          COALESCE(
            (SELECT json_group_array(
               json_object(
                 'id', tracks.id,
                 'creator_id', tracks.creator_id,
                 'title', tracks.title,
                 'audio_url', tracks.audio_url,
                 'thumbnail_url', tracks.thumbnail_url,
                 'creator_name', users.name,
                 'genre', tracks.genre
               )
             )
             FROM tracks
             WHERE tracks.creator_id = users.id),
             '[]'
           ) as tracks
        `)
      );
    // Parse JSON strings in tracks
    const parsedCreators = creators.map(creator => ({
      ...creator,
      tracks: JSON.parse(creator.tracks),
      is_subscribed: creator.is_subscribed ? 1 : 0,
      subscriber_count: parseInt(creator.subscriber_count) || 0
    }));
    res.json(parsedCreators);
  } catch (err) {
    console.error('Error fetching creators:', err);
    res.status(500).json({ error: 'Failed to fetch creators' });
  }
});

// Upload Track
router.post('/tracks', async (req, res) => {
  const { creator_id, title, audio_url, thumbnail_url, genre } = req.body;
  if (!creator_id || !title || !audio_url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const [id] = await knex('tracks').insert({ creator_id, title, audio_url, thumbnail_url, genre });
    res.status(201).json({ id, creator_id, title, audio_url, thumbnail_url, genre });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload track' });
  }
});

// Update Track
router.put('/tracks/:trackId', async (req, res) => {
  const { creator_id, title, audio_url, thumbnail_url, genre } = req.body;
  const trackId = parseInt(req.params.trackId);
  if (!creator_id || !title || !audio_url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const track = await knex('tracks').where({ id: trackId }).first();
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }
    if (track.creator_id !== creator_id) {
      return res.status(403).json({ error: 'Unauthorized: Not the track owner' });
    }
    await knex('tracks')
      .where({ id: trackId })
      .update({ title, audio_url, thumbnail_url, genre });
    res.status(200).json({ id: trackId, creator_id, title, audio_url, thumbnail_url, genre });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update track' });
  }
});

// Delete Track
router.delete('/tracks/:trackId', async (req, res) => {
  const { creator_id } = req.body;
  const trackId = parseInt(req.params.trackId);

  if (!creator_id) {
    return res.status(400).json({ error: 'Missing creator_id' });
  }

  try {
    const track = await knex('tracks').where({ id: trackId }).first();
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }
    if (track.creator_id !== creator_id) {
      return res.status(403).json({ error: 'Unauthorized: Not the track owner' });
    }

    const audioPath = getPathFromUrl(track.audio_url);
    const thumbnailPath = getPathFromUrl(track.thumbnail_url);

    // Delete from Supabase Storage
    if (audioPath) {
      const { error } = await supabase.storage.from('audio').remove([audioPath]);
      if (error) console.error('Supabase audio delete error:', error.message);
    }
    if (thumbnailPath) {
      const { error } = await supabase.storage.from('thumbnails').remove([thumbnailPath]);
      if (error) console.error('Supabase thumbnail delete error:', error.message);
    }

    // Delete from Database
    await knex('plays').where({ track_id: trackId }).del();
    await knex('tracks').where({ id: trackId }).del();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Delete track error:', err);
    res.status(500).json({ error: 'Failed to delete track' });
  }
});

// Get Creator's Tracks
router.get('/tracks/creator/:creatorId', async (req, res) => {
  try {
    const creatorId = parseInt(req.params.creatorId);
    const tracks = await knex('tracks')
      .where('creator_id', creatorId)
      .select('id', 'title', 'audio_url', 'thumbnail_url');
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

// Subscribe/Unsubscribe
router.post('/subscriptions', async (req, res) => {
  const { listener_id, creator_id, action } = req.body;
  if (!listener_id || !creator_id || !['subscribe', 'unsubscribe'].includes(action)) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  try {
    if (action === 'subscribe') {
      await knex('subscriptions').insert({ listener_id, creator_id });
    } else {
      await knex('subscriptions').where({ listener_id, creator_id }).del();
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(409).json({ error: 'Subscription action failed' });
  }
});

// Get Subscriptions
router.get('/subscriptions/:listenerId', async (req, res) => {
  try {
    const listenerId = parseInt(req.params.listenerId);
    if (isNaN(listenerId)) {
      return res.status(400).json({ error: 'A valid listenerId is required.' });
    }
    // This query now correctly fetches ONLY the subscribed creators, avoiding duplicates.
    const subscriptions = await knex('subscriptions')
      .where('subscriptions.listener_id', listenerId)
      .join('users', 'subscriptions.creator_id', 'users.id')
      .select('users.id as creator_id', 'users.name');
    res.json(subscriptions);
  } catch (err) {
    console.error('Error fetching subscriptions:', err);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

// Log Play
router.post('/plays', async (req, res) => {
  const { listener_id, track_id } = req.body;
  if (!listener_id || !track_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await knex('plays').insert({ listener_id, track_id });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log play' });
  }
});

// Get Analytics for Creator
router.get('/analytics/:creatorId', async (req, res) => {
  try {
    const creatorId = parseInt(req.params.creatorId);
    const subscriberCount = await knex('subscriptions')
      .where('creator_id', creatorId)
      .count('id as count')
      .first();
    const playCount = await knex('plays')
      .join('tracks', 'plays.track_id', 'tracks.id')
      .where('tracks.creator_id', creatorId)
      .count('plays.id as count')
      .first();
    res.json({
      subscriber_count: subscriberCount?.count || 0,
      play_count: playCount?.count || 0,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;