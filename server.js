// console.log("УРАААААааааа!");

// // подключение express
// const express = require("express");
// var cors = require('cors')
// var bodyparser = require('body-parser');
// // создаем объект приложения
// const app = express();
// app.use(cors())
// app.set("view engine", "hbs");

// var values = []

// // определяем обработчик для маршрута "/"
// app.get("/", function(request, response){
     
//     // отправляем ответ
//     response.render("index.hbs",{
//       title: "Values",
//       values: values,
//   });
// });
// app.use(bodyparser.json({limit: '50mb'}));
// const urlencodedParser = express.urlencoded({extended: false});

// app.post("/someEndpoint", urlencodedParser, function (request, response) {
//   if(!request.body) return response.sendStatus(400);
//   console.log(request.body);
//   let date = new Date();
//   values.unshift({id:request.body.id, name:request.body.name, date: date.getHours().toString() + ":" + date.getMinutes().toString()+ ":" + date.getSeconds().toString() + "." + date.getMilliseconds().toString(), value:request.body.currentValue});
//   response.send(request.body);
// });

// app.get("/clean", urlencodedParser, function (request, response) {
//   values = []
//   console.log("Clean")
//   response.send("ПОЛУЧИЛ GET");
// });
// // начинаем прослушивать подключения на 3000 порту
// app.listen(8000); 

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
    ws.send('hello');
  });
  console.log('socket', req.testing);

});

app.listen(8000)