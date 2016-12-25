var express=require('express');
var app=express();
var routeF=require('./routes/frontRoute');
var routeB=require('./routes/backRoute');
var path=require('path');
var jade=require('jade');

app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"views"));
app.engine('.jade',jade.__express);
app.set('view engine', 'jade');

routeF(app);
routeB(app);

var server=app.listen(3000,function(){
   console.log('server running at 127.0.0.1:3000');
});

require('./routes/server/mySocket')(server);
