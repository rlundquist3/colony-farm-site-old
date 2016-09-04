var express = require('express');
var nodemailer = require('nodemailer');
var firebase = require('firebase');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Initialize the app with no authentication
firebase.initializeApp({
  databaseURL: "https://colonyfarm-bae40.firebaseio.com"
});

// The app only has access to public data as defined in the Security Rules
var db = firebase.database();
var ref = db.ref("/some_public_resource");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/blog/:title?', function(req, res) {
    var postsRef = db.ref('posts');
    // postsRef.orderByChild('date').limitToLast(5).on('child_added', function(snapshot) {
    //     console.log(snapshot.key);
    // });
    postsRef.once('value', function(data) {
        var postList = Object.keys(data).map(function(value) {
							         return data[value]})
    });
    if (title === undefined) {
		res.status(503);
		res.render('blog', {posts: postList});
	} else {
		var post = posts[title] || {};
		res.render('post', {post: post});
	}
});

// app.post('/contact', function(request, response) {
//     var options, transporter;
//
//     transporter = nodemailer.createTransport('SMTP', {
//         service: 'GandiMail',
//         auth: {
//             user: 'noreply@colony.farm',
//             pass: 'crickets123$%'
//         }
//     });
//
//     options = {
//         from: request.body.name + ' ' + req.body.email,
//         to: 'info@colony.farm',
//         subject: 'Website contact form',
//         text: req.body.message
//     };
//
//     transporter.sendMail(options, function(error, response) {
//         if (error) {
//
//         } else {
//
//         }
//     });
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
