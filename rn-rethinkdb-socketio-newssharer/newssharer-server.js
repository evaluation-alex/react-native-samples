var r = require('rethinkdb');

var express = require('express');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var connection;

r.connect({host: 'localhost', port: 28015}, function(err, conn) {
    if(err) throw err;
    connection = conn;

    r.db('newssharer').table('news_items')
    	.orderBy({index: r.desc('upvotes')})
    	.changes()
    	.run(connection, function(err, cursor){

			if (err) throw err;
			io.sockets.on('connection', function(socket){
				cursor.each(function(err, row){
					if(err) throw err;
					io.sockets.emit('news_updated', row);
				});
			});
    });

});

app.get('/add-index', function(req, res){
    r.db('newssharer').table('news_items').indexCreate('upvotes').run(connection, function(err, result){
    	console.log('boom');
    	res.send('ok')
    });
});

app.get('/fill', function(req, res){
	r.db('newssharer').table('news_items').insert([
		{
			title: 'A Conversation About Fantasy User Interfaces',
			url: 'https://www.subtraction.com/2016/06/02/a-conversation-about-fantasy-user-interfaces/',
			upvotes: 30
		},
		{
			title: 'Apple Cloud Services Outage',
			url: 'https://www.apple.com/support/systemstatus/',
			upvotes: 20
		}
	]).run(connection, function(err, result){
		if (err) throw err;
		res.send('news_items table was filled!');
	});
});

app.get('/news', function(req, res){
	res.header("Content-Type", "application/json");
	r.db('newssharer').table('news_items')
		.orderBy({index: r.desc('upvotes')})
    	.limit(30)
		.run(connection, function(err, cursor) {
	    	if (err) throw err;
		    cursor.toArray(function(err, result) {
		        if (err) throw err;
		        res.send(result);
		    });
	});
});

app.post('/save-newsitem', function(req, res){

	var news_title = req.body.news_title;
	var news_url = req.body.news_url;

	r.db('newssharer').table('news_items').insert([
	   {
	   	'title': news_title,
	   	'url': news_url,
	   	'upvotes': 100
	   },
	]).run(connection, function(err, result){
	    if (err) throw err;
	    res.send('ok');
	});

});

app.post('/upvote-newsitem', function(req, res){

	var id = req.body.news_id;
	var upvote_count = req.body.upvotes;

	r.db('newssharer').table('news_items')
		.filter(r.row('id').eq(id))
		.update({upvotes: upvote_count})
		.run(connection, function(err, result) {
		    if (err) throw err;
		    res.send('ok');
		});
});

app.get('/test/upvote', function(req, res){
	var id = '144f7d7d-d580-42b3-8704-8372e9b2a17c';
	var upvote_count = 350;

	r.db('newssharer').table('news_items')
		.filter(r.row('id').eq(id))
		.update({upvotes: upvote_count})
		.run(connection, function(err, result) {
		    if (err) throw err;
		    res.send('ok');
		});
});

app.get('/test/save-newsitem', function(req, res){

	r.db('newssharer').table('news_items').insert([
	   {
	   	'title': 'banana',
	   	'url': 'http://banana.com',
	   	'upvotes': 190,
	   	'downvotes': 0
	   },
	]).run(connection, function(err, result){
	    if(err) throw err;
	    res.send('ok');
	});

});

console.log('rethink newsharer listening port: ', 3000)
server.listen(3000);
