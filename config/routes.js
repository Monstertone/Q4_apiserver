//Update the name of the controller below and rename the file.
const users = require("../controllers/users.js")
const transactions = require("../controllers/transactions.js")

module.exports = function(app){

  app.get('/users', users.all);
  app.get('/users/:id', users.single);
  app.post('/users', users.add);
  app.patch('/users/:id', users.edit);
  app.delete('/users/:id', users.delete);

  app.get('/transactions', transactions.all);
  app.get('/transactions/:id', transactions.single);
  app.post('/transactions', transactions.add);
  app.patch('/transactions/:id', transactions.edit);
  app.delete('/transactions/:id', transactions.delete);
}
