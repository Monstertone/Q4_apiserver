
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        {users_id: 1, amount: 44.97, type:'gasoline', business_name:'Costco'},
        {users_id: 2, amount: 16.99, type:'paper supplies', business_name:'Office Depot'},
        {users_id: 3, amount: 108.43, type:'computer parts', business_name:'Frys Electronics'},
        {users_id: 1, amount: 79.99, type:'printer', business_name:'Frys Electronics'},
        {users_id: 3, amount: 34.27, type:'learning courses', business_name:'Udemy'},
        {users_id: 3, amount: 299.99, type:'galaga machine', business_name:'Walmart'},

      ]);
    });
};
