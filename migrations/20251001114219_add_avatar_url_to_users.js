exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.string('avatar_url'); // Add an optional string column for the avatar URL
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('avatar_url');
  });
};