/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.enu('role', ['creator', 'listener']).notNullable();
    }),
    knex.schema.createTable('tracks', table => {
      table.increments('id').primary();
      table.integer('creator_id').unsigned().references('users.id');
      table.string('title').notNullable();
      table.string('audio_url').notNullable();
      table.string('thumbnail_url');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('subscriptions', table => {
      table.increments('id').primary();
      table.integer('listener_id').unsigned().references('users.id');
      table.integer('creator_id').unsigned().references('users.id');
      table.unique(['listener_id', 'creator_id']);
    }),
    knex.schema.createTable('plays', table => {
      table.increments('id').primary();
      table.integer('listener_id').unsigned().references('users.id');
      table.integer('track_id').unsigned().references('tracks.id');
      table.timestamp('played_at').defaultTo(knex.fn.now());
    })
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('plays'),
    knex.schema.dropTableIfExists('subscriptions'),
    knex.schema.dropTableIfExists('tracks'),
    knex.schema.dropTableIfExists('users')
  ]);
};