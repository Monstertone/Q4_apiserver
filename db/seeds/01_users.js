
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'abcd@gmail.com', password: 'passworda'},
        {email: '1234@gmail.com', password: 'password1'},
        {email: 'dog@gmail.com', password: 'passwordd'},

      ]);
    });
};
