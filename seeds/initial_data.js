/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries in reverse order of creation
  await knex('plays').del();
  await knex('subscriptions').del();
  await knex('tracks').del();
  await knex('users').del();

  // Inserts the user profiles with new avatar URLs
  await knex('users').insert([
    // Creators
    { id: 1, name: 'Eminem', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/eminem.jpeg' },
    { id: 2, name: 'Drake', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/drake.jpeg' },
    { id: 3, name: 'Kendrick Lamar', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/kendricklamar.jpeg' },
    { id: 4, name: 'Martin Garrix', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/martingarrix.jpeg' },
    { id: 5, name: 'Marshmello', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/marshmello.jpeg' },
    { id: 6, name: 'The Chainsmokers', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/thechainsmokers.jpeg' },
    { id: 7, name: 'Taylor Swift', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/taylorswift.jpeg' },
    { id: 8, name: 'Ed Sheeran', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/edsheeran.jpeg' },
    { id: 9, name: 'Linkin Park', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/linkinpark.jpeg' },
    { id: 10, name: 'Queen', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/queen.jpeg' },
    { id: 11, name: 'Nirvana', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/nirvana.jpeg' },
    { id: 12, name: 'The Beatles', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/thebeatles.jpeg' },
    { id: 13, name: 'Michael Jackson', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/michaeljackson.jpeg' },
    { id: 14, name: 'Elton John', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/eltonjohn.jpeg' },
    { id: 15, name: 'Coldplay', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/coldplay.jpeg' },
    { id: 16, name: 'The Weeknd', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/theweeknd.jpeg' },
    { id: 17, name: 'Post Malone', role: 'creator', password: '123', avatar_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/avatars/postmalone.jpeg' },
    // Listeners
    { id: 18, name: 'Demo', role: 'listener', password: '123' },
    { id: 19, name: 'Test', role: 'listener', password: '123' },
  ]);

  // Inserts all the tracks, linking them to the creators by their ID
  return knex('tracks').insert([
    // --- Rap ---
    {
      creator_id: 1, // Eminem
      title: 'Lose Yourself',
      genre: 'Rap',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Eminem%20-%20Lose%20Yourself.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/eminem-loseyourself.jpg',
    },
    {
      creator_id: 2, // Drake
      title: 'God’s Plan',
      genre: 'Rap',
      audio_url: "https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Drake%20-%20God's%20Plan.mp3",
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/drake-godsplan.jpeg',
    },
    {
      creator_id: 3, // Kendrick Lamar
      title: 'HUMBLE.',
      genre: 'Rap',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Kendrick%20Lamar%20-%20HUMBLE.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/kendricklamar-humble.jpg',
    },
    // --- EDM ---
    {
      creator_id: 4, // Martin Garrix
      title: 'Animals',
      genre: 'EDM',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Martin%20Garrix%20-%20Animals.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/martingarrix-animals.jpeg',
    },
    {
      creator_id: 5, // Marshmello
      title: 'Alone',
      genre: 'EDM',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Marshmello%20-%20Alone.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/marshmello-alone.jpg',
    },
    {
      creator_id: 6, // The Chainsmokers
      title: 'Closer',
      genre: 'EDM',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/The%20Chainsmokers%20-%20Closer.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/thechainsmokers-closer.jpg',
    },
    // --- Pop ---
    {
      creator_id: 7, // Taylor Swift
      title: 'Shake It Off',
      genre: 'Pop',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Taylor%20Swift%20-%20Shake%20It%20Off.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/taylorswift-shakeitoff.jpg',
    },
    {
      creator_id: 8, // Ed Sheeran
      title: 'Shape of You',
      genre: 'Pop',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Ed%20Sheeran%20-%20Shape%20of%20You.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/edsheeran-shapeofyou.jpg',
    },
    {
      creator_id: 8, // Ed Sheeran
      title: 'Perfect',
      genre: 'Pop',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Ed%20Sheeran%20-%20Perfect.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/edsheeran-perfect.jpg',
    },
    // --- Rock ---
    {
      creator_id: 9, // Linkin Park
      title: 'Numb',
      genre: 'Rock',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Linkin%20Park%20-%20Numb.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/linkinpark-numb.jpg',
    },
    {
      creator_id: 10, // Queen
      title: 'Bohemian Rhapsody',
      genre: 'Rock',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Queen%20-%20Bohemian%20Rhapsody.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/queen-bohemianrhapsody.jpg',
    },
    {
      creator_id: 11, // Nirvana
      title: 'Smells Like Teen Spirit',
      genre: 'Rock',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Nirvana%20-%20Smells%20Like%20Teen%20Spirit.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/nirvana-smellsliketeamspirit.jpg',
    },
    // --- Evergreen ---
    {
      creator_id: 12, // The Beatles
      title: 'Let It Be',
      genre: 'Evergreen',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/The%20Beatles%20-%20Let%20It%20Be.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/thebeatles-letitbe.jpeg',
    },
    {
      creator_id: 13, // Michael Jackson
      title: 'Billie Jean',
      genre: 'Evergreen',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Michael%20Jackson%20-%20Billie%20Jean.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/michaeljackson-billejean.jpg',
    },
    {
      creator_id: 14, // Elton John
      title: 'Your Song',
      genre: 'Evergreen',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Elton%20John%20-%20Your%20Song.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/eltonjohn-yoursong.jpg',
    },
    // --- Chill ---
    {
      creator_id: 15, // Coldplay
      title: 'Yellow',
      genre: 'Chill',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Coldplay%20-%20Yellow.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/coldplay-yellow.jpg',
    },
    {
      creator_id: 16, // The Weeknd
      title: 'Save Your Tears',
      genre: 'Chill',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/The%20Weeknd%20-%20Save%20Your%20Tears.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/theweeknd-saveyourtears.jpg',
    },
    {
      creator_id: 17, // Post Malone
      title: 'Circles',
      genre: 'Chill',
      audio_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/audio/Post%20Malone%20-%20Circles.mp3',
      thumbnail_url: 'https://hlldvipbakpspvzkxknj.supabase.co/storage/v1/object/public/thumbnails/postmalone-circles.jpg',
    },
  ]);
};