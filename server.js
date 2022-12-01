const host = '51.195.16.18'
const port = 8080
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

app.ws('/', function(ws, req) { 
  ws.on('message', function(msg) { 
    elemData = new Map(JSON.parse(msg));
    console.log(elemData);
    let sendMap;
    if (parseInt(elemData.get('id')) + 16 < 1019) {
      // console.log("#### " + (parseInt(parseInt(elemData.get('id'))) + 16));
      sendMap = new Map([
        ['id', parseInt(elemData.get('id'))],
        ['next_id', parseInt(elemData.get('id')) + 16],
        ['flag', true]
      ]);
    } else {
      sendMap = new Map([
        ['id', parseInt(elemData.get('id'))],
        ['flag', false]
      ]);
    }
    ws.send(JSON.stringify(Array.from(sendMap)));
  });

});

app.listen(port, host, function () {
  console.log(`Server listens ws://${host}:${port}`);
});
