const knex = require("../db/knex.js");

module.exports = {

  all: (req, res)=> {
    knex('users').then((results)=>{
      res.json(results);
    })
  },

  single:(req, res)=> {
    knex('users').where('id', req.params.id)
    .then((result) =>{
      res.json(result)
    })
  },

  add:(req,res)=>{
    knex('users').insert({
      email: req.body.email,
      password: req.body.password
    }).then((results)=>{
      res.send(200)
    });
  },

  edit:(req, res)=>{
    knex('users').update({
      email:req.body.email,
      password:req.body.password
    }).where('id', req.params.id).then((results)=>{
      res.send(200);
    })
  },

  delete:(req, res)=>{
    knex('users').delete().where('id', req.params.id).then(()=>{
      res.send(200);
    })
  }


}
