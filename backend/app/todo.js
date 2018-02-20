// API logic for handles /todo endpoint
// Params are populated in req.

'use strict';

const User = require('../models/user');

/**
 * @return json representation of all the todo items.
 */
exports.getTodos = function (req, res) {
  User.find(
    { _id: req.user.id },
    { todoItems: 1 }, function(err, result) {
    if (err) {
      console.log('Failed to get todos: %s', err);
      return res.send(500, 'Failed to get todos.');
    }
    console.log('todo items = %s', result);
    res.json(result);
  });
};

/**
 * Add a new todo item.
 * @param todo_content (string)
 */
exports.addTodo = function (req, res) {
  console.log('addTodo req content = %s user id = %s', req.todo_content, req.user.id);
  req.todo_content = 'test content 2';
  var newTodoItem = {priority: 1, content: req.todo_content};
  User.findOneAndUpdate(
    {_id: req.user.id },
    { $push: {todoItems: newTodoItem} },
    function(err, result) {
      if (err) {
        console.log('Failed to add todos: %s', err);
        return res.send(500, 'Failed to add todos.')
      }
      console.log('added todo %s', result);
      res.end();
    });
};