(function(){
  'use strict';

  var express = require('express');
  var app = express();
  var http =require('http');
  var server = http.createServer(app);
  //var io = require('socket.io').listen(server);
  var configs = require('./configs/config');
  var mongoose = require('mongoose');
  var morgan = require('morgan');
 /* var request = require('request');*/
  var bodyParser = require('body-parser');

    // var redisClient = require('redis').createClient;
    // var redis = redisClient(6379, 'localhost');
    // var cache_logics = require('./cache/cache_logics');
    try{
        mongoose.connect('mongodb://'+configs.dbHost+'/'+configs.dbName);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('open connection')
        });
    }catch(e){
        console.log(e);
    }



  app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
  });

   app.set('PORT',process.env.PORT || '4444');
   app.set('views',__dirname+'/public');
   app.set('view engine', 'ejs');
   app.engine('html', require('ejs').renderFile);
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(morgan('dev'));
   app.use(express.static(__dirname + '/public'));
   app.use('/img',express.static(__dirname+'/public/assets/img'));
   app.use('/css',express.static(__dirname+'/public/assets/css'));
   app.use('/js',express.static(__dirname+'/public/assets/js'));

 /*  require('./apis/SolutionsApis')(app,request);
   require('./apis/SitemapApis')(app,request);
   require('./apis/SearchResults')(app,request);
   require('./apis/topicsApis')(app,request);
   require('./apis/TutorialsApi')(app,request);
   require('./apis/HyperledgerApi')(app,request);*/
  /* require('./apis/mainApis')(app);*/

   app.get('/',function(req,res){
     res.render('inde.html');
   });

  /* app.get('/about',function(req,res){
     res.render('pages/about.html');
   });*/




  server.listen(app.get('PORT'),function(){
      console.log('all magic happens at port '+app.get('PORT'));
  });

})();
