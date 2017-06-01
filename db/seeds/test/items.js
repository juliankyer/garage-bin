
exports.seed = function(knex, Promise) {
  return knex('garage').del()
    .then(function () {
      return knex('garage').insert([
        {
          id: 1, 
          name: 'Townie',
          reason: 'Gotta have at least one bike',
          cleanliness: 'Dusty',
        },
        {
          id: 2, 
          name: 'Bucket',
          reason: 'Used to wash bikes',
          cleanliness: 'Rancid',
        },
      ]);
    });
};
