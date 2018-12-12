const knex = require("../db/knex.js");
const hasher = require('../config/hasher.js');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret';

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
      hasher.hash(req.body).then((user)=>{
        knex('users').insert({
          email: user.email,
          password: user.password
        }, 'id').then((results)=>{
          res.json({message: "Successfully registered, please log in", id:results[0]});
        }).catch((err)=>{
          res.status(400).send({message: err});
        })
      })
    },

    login: (req, res)=>{
   knex('users')
     .where('email', req.body.email)
     .first()
     .then((user)=>{
       if(user){
         hasher.check(user, req.body).then((isMatch)=>{
           if(isMatch){
             const token = jwt.sign(user, secret);
             delete user.password;
             res.json({message: "Successfully signed in", token, user})  //property value shorthand for token:token
           }else{
             res.status(400).send({message: 'Invalid Email / Password'});
           }
         })
       }else{
         res.status(400).send({message: 'Invalid Email / Password'});
       }
     }).catch((err)=>{
       res.status(400).send({message: 'Invalid Email / Password'});
     })
},

verify: (req, res, next)=>{
  res.json(req.decoded);
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
