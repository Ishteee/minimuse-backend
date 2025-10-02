/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('tracks', table => {
    table.string('genre'); // Add a new string column called 'genre'
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('tracks', table => {
    table.dropColumn('genre'); // How to undo the change
  });
};
