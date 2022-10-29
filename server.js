const host = 'localhost'
const port = 8000

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

// app.use(function (req, res, next) {
//   req.testing = 'testing';
//   return next();
// });

// app.get('/', function(req, res, next){
//   console.log('get route', req.testing);
//   res.end();
// });

app.ws('/', function(ws, req) { // Слушаем адрес
  ws.on('message', function(msg) { // Обработка запроса
    elemData = new Map(JSON.parse(msg));
    console.log(elemData);
    ws.send(JSON.stringify(Array.from(elemData.entries())));
  });

});

app.listen(port, host, function () {
  console.log(`Server listens ws://${host}:${port}`);
});