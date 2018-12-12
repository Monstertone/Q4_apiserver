const knex = require("../db/knex.js");

module.exports = {

  all: (req, res)=> {
    knex('transactions').then((results)=>{
      res.json(results);
    })
  },

  single:(req, res)=> {
    knex('transactions').where('id', req.params.id)
    .then((result) =>{
      res.json(result)
    })
  },

  add:(req,res)=>{
    knex('transactions').insert({
      users_id: req.decoded.id,
      amount: req.body.amount,
      type: req.body.type,
      business_name: req.body.business_name
    }).then((results)=>{
      res.send(200)
    })
  },

  edit:(req, res)=>{
    knex('transactions').update({
      users_id: req.body.users_id,
      amount: req.body.amount,
      type: req.body.type,
      business_name: req.body.business_name
    }).where('id', req.params.id).then((results)=>{
      res.send(200);
    })
  },

  delete:(req, res)=>{
    knex('transactions').delete().where('id', req.params.id).then(()=>{
      res.send(200);
    })
  }

}
