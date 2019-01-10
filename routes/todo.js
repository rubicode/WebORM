var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Todo.findAll({}).then(function(todos) {
    res.json(todos);
  });
});

router.post('/', function(req, res, next) {
  models.Todo.create({
    title: req.body.title,
    complete: false
  }).then(function(todo) {
    res.json(todo);
  });
});

router.put('/:id', function(req, res, next) {
  models.Todo.find({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    if(todo){
      todo.updateAttributes({
        title: req.body.title,
        complete: req.body.complete
      }).then(function(todo) {
        res.json(todo);
      });
    }
  });
});

router.delete('/:id', function(req, res, next) {
  models.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    res.json(todo);
  });
});

module.exports = router;
