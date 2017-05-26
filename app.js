var express = require('express');
var app = express();
var routeF = require('./routes/frontRoute');
var routeB = require('./routes/backRoute');
var path = require('path');
var jade = require('jade');

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.engine('.jade', jade.__express);
app.set('view engine', 'jade');

routeF(app);
//routeB(app);

var port = 80;

//app.use(function (req, res, next) {
//    console.log(404);
//    res.status(404).send('404');
//});

app.listen(port, function () {
    console.log('server running at 127.0.0.1:' + port);
});

//require('./routes/server/mySocket')(server);
