const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './minimuse.db'
  },
  useNullAsDefault: true
});

async function resetDatabase() {
  try {
    // Drop tables if they exist
    await knex.schema.dropTableIfExists('plays');
    await knex.schema.dropTableIfExists('subscriptions');
    await knex.schema.dropTableIfExists('tracks');
    await knex.schema.dropTableIfExists('users');

    // Create users table with password
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('role').notNullable();
      table.string('password').notNullable();
    });

    // Create tracks table
    await knex.schema.createTable('tracks', (table) => {
      table.increments('id').primary();
      table.integer('creator_id').unsigned().references('users.id');
      table.string('title').notNullable();
      table.string('audio_url').notNullable();
      table.string('thumbnail_url');
    });

    // Create subscriptions table
    await knex.schema.createTable('subscriptions', (table) => {
      table.increments('id').primary();
      table.integer('listener_id').unsigned().references('users.id');
      table.integer('creator_id').unsigned().references('users.id');
    });

    // Create plays table
    await knex.schema.createTable('plays', (table) => {
      table.increments('id').primary();
      table.integer('listener_id').unsigned().references('users.id');
      table.integer('track_id').unsigned().references('tracks.id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });

    console.log('Database reset successfully');
  } catch (err) {
    console.error('Error resetting database:', err);
  } finally {
    await knex.destroy();
  }
}

resetDatabase();