const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');

const models = require('../models/index');
const should = chai.should();

chai.use(chaiHTTP);

describe('crud todo', function(){

  beforeEach(function(done){
    models.Todo.destroy({
      where: {},
      truncate: true
    }).then(()=>{
      models.Todo.create({
        title: "pekerjaan pertama",
        complete: false
      }).then(function(todo) {
        done();
      });
    })
  });

  afterEach(function(done){
    models.Todo.destroy({
      where: {},
      truncate: true
    }).then(()=>{
      done();
    });
  });

  it('seharusnya menampilkan daftar semua todo dengan metode GET', function(done){
    chai.request(server)
    .get('/api/todos')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('id');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('complete');
      res.body[0].title.should.equal('pekerjaan pertama');
      res.body[0].complete.should.equal(false);
      done();
    })
  })

  it('seharusnya menambahkan satu todo dengan metode POST', function(done){
    chai.request(server)
    .post('/api/todos')
    .send({
      title: 'makan'
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('title');
      res.body.should.have.property('complete');
      res.body.title.should.equal('makan');
      res.body.complete.should.equal(false);
      done();
    })
  })

  it('seharusnya merubah satu todo berdasarkan id dengan metode PUT', function(done){
    chai.request(server)
    .get('/api/todos')
    .end(function(err, res){
      chai.request(server)
      .put('/api/todos/' + res.body[0].id)
      .send({
        title: "mandi",
        complete: true
      }).end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.should.have.property('title');
        response.body.should.have.property('complete');
        response.body.title.should.equal('mandi');
        response.body.complete.should.equal(true);
        done();
      })
    })
  })

  it('seharusnya menghapus satu todo berdasarkan id dengan metode DELETE', function(done){
    chai.request(server)
    .get('/api/todos')
    .end(function(err, res){
      chai.request(server)
      .delete('/api/todos/' + res.body[0].id)
      .end(function(error, response){
        //console.log('response body', response.body);
        response.should.have.status(200);
        done();
      })
    })
  })


});
