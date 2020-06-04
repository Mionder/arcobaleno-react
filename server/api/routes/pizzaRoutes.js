'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/pizzaController');

  // todoList Routes
  app.route('/pizzas')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/pizzas/:pizzaId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);


    app.route('/drinks')
    .get(todoList.list_all_drinks)
    .post(todoList.create_a_drink);


  app.route('/drinks/:drinkId')
    .get(todoList.read_a_drink)
    .put(todoList.update_a_drink)
    .delete(todoList.delete_a_drink);

    app.route('/sales')
    .get(todoList.list_all_sales)
    .post(todoList.create_a_sale);


  app.route('/sales/:saleId')
    .get(todoList.read_a_sale)
    .put(todoList.update_a_sale)
    .delete(todoList.delete_a_sale);

    app.route('/users')
    .get(todoList.list_all_users)
    .post(todoList.create_a_user);


  app.route('/users/:userId')
    .get(todoList.read_a_user)
    .put(todoList.update_a_user)
    .delete(todoList.delete_a_user);
};