
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var moment = require('moment');
var io = require('socket.io').listen(server.listen(app.get("port")));

io.sockets.on('connection', function (socket) {
	console.log("connected");
	setInterval(function() {
		var nowCnt = 0, hourCnts = [];
		var imagesnap = require('imagesnap');
		var fs = require('fs');
		var imageStream = fs.createWriteStream('capture.jpg');
		imagesnap().pipe(imageStream);
		var mv = require('mv');


		mv('capture.jpg', '/Users/<username>/Dropbox/Public/capture.jpg', function(err) {
		    // console.log("error");
		});

		setTimeout(function(){ 
			var unirest = require('unirest');
		var url = 'https://dl.dropboxusercontent.com/u/<userid>/capture.jpg';
		var Request = unirest.get("https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?url=" +url)
		  .headers({ 
		    "X-Mashape-Authorization": "<mashape-key>"
		  })
		  .end(function (response) {
		    console.log(response.body.face);
		    // res.render('index', { count: response.body.face.length });
		    if(response.body.face !== undefined) {
		    	nowCnt = response.body.face.length;
		    	hourCnts.push([moment().subtract('hour', 1).toDate().getTime(), 0]);
		    	hourCnts.push([moment().toDate().getTime(), nowCnt]);
		    	data = {'now':nowCnt, 'hour':hourCnts };
	  			io.sockets.emit('data', data);
			}
		  });
		}, 5* 1000);
	}, 15*1000);

});



