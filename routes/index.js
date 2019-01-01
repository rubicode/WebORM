var express = require('express');
var router = express.Router();
var models = require('../models/index');
var helpers = require('../helpers/util');

/* GET home page. */
router.get('/', helpers.loggedIn ,function(req, res, next) {
  models.Todo.findAll({}).then(function(todos) {
    res.render('index', {todos, user: req.session.user});
  });
});

router.get('/add', helpers.loggedIn ,function(req, res, next) {
  res.render('add');
});

router.post('/add', helpers.loggedIn ,function(req, res, next) {
  models.Todo.create({
    title: req.body.title,
    complete: JSON.parse(req.body.complete)
  }).then(function(todo) {
    res.redirect("/");
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  //login check
  if(req.body.email == "rubi@gmail.com" && req.body.password == "1234"){
    req.session.user = req.body.email;
    res.redirect("/");
  }else{
    res.redirect("login");
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect("/login");
  })
});

module.exports = router;
