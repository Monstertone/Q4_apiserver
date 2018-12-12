//Update the name of the controller below and rename the file.
const users = require("../controllers/users.js")
const transactions = require("../controllers/transactions.js")
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret';

module.exports = function(app){


  app.post('/users', users.add);

  app.post('/sessions', users.login);  //named sessions although not actually generating and sending a cookie

  app.use(verifyToken);
  app.get('/user', users.verify);
  app.get('/users', users.all);
  app.get('/users/:id', users.single);

  app.patch('/users/:id', users.edit);
  app.delete('/users/:id', users.delete);

  app.get('/transactions', transactions.all);
  app.get('/transactions/:id', transactions.single);
  app.post('/transactions', transactions.add);
  app.patch('/transactions/:id', transactions.edit);
  app.delete('/transactions/:id', transactions.delete);
}

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(401).send({message: 'You are not authorized to view that resource, Please log in to continue.' });
      } else {
        // if everything is good, save to request for use in other routes
        delete decoded.password;
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(401).send({
        message: 'You are not authorized to view that resource, Please log in to continue.'
    });

  }
}
