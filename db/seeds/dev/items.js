
exports.seed = function(knex, Promise) {
  return knex('garage').del()
    .then(function () {
      return knex('garage').insert([
        {
          name: 'Townie',
          reason: 'Gotta have at least one bike',
          cleanliness: 'Dusty',
        },
        {
          name: 'Bucket',
          reason: 'Used to wash bikes',
          cleanliness: 'Rancid',
        },
      ]);
    });
};
