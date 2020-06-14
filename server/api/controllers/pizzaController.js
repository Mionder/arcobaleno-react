'use strict';


var mongoose = require('mongoose'),
  Pizza = mongoose.model('Pizzas'),
  Sale = mongoose.model('Sales'),
  User = mongoose.model('Users'),
  Drink = mongoose.model('Drinks');

// Pizza

exports.list_all_tasks = function(req, res) {
    Pizza.find({}, function(err, task) {
    if (err)
    return res.send(err);
       return res.json(task);
  });
};




exports.create_a_task = function(req, res) {
  var new_task = new Pizza(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
    Pizza.findById(req.params.pizzaId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
    Pizza.findOneAndUpdate({_id: req.params.pizzaId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


    Pizza.remove({
    _id: req.params.pizzaId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Pizza successfully deleted' });
  });
};

// Drinks


exports.list_all_drinks = function(req, res) {
    Drink.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_drink = function(req, res) {
  var new_task = new Drink(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_drink = function(req, res) {
    Drink.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_drink = function(req, res) {
    Drink.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_drink = function(req, res) {


    Drink.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Drink successfully deleted' });
  });
};

// sales

exports.list_all_sales = function(req, res) {
    Sale.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_sale = function(req, res) {
  var new_task = new Sale(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_sale = function(req, res) {
    Sale.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_sale = function(req, res) {
    Sale.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_sale = function(req, res) {


    Sale.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Sale successfully deleted' });
  });
};

// Users

exports.list_all_users = function(req, res) {
  User.find({}, function(err, task) {
  if (err)
    res.send(err);
  res.json(task);
});
};




exports.create_a_user = function(req, res) {
var new_task = new User(req.body);
new_task.save(function(err, task) {
  if (err)
    res.send(err);
  res.json(task);
});
};


exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, task) {
  if (err)
    res.send(err);
  res.json(task);
});
};


exports.update_a_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, task) {
  if (err)
    res.send(err);
  res.json(task);
});
};


exports.delete_a_user = function(req, res) {


  User.remove({
  _id: req.params.userId
}, function(err, task) {
  if (err)
    res.send(err);
  res.json({ message: 'User successfully deleted' });
});
};