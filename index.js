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

app.get('/', function(req, res) {
    var path = req.path;
	res.locals.path = path;
    res.render('index');
});

// app.get('/blog/:title?', function(req, res) {
//
//     // postsRef.orderByChild('date').limitToLast(5).on('child_added', function(snapshot) {
//     //     console.log(snapshot.key);
//     // });
//
//     var title = req.params.title;
//     var posts;
//     var postList;
//     var postsRef = db.ref('posts');
//     postsRef.once('value', function(data) {
//         posts = data.val();
//         postList = Object.keys(posts).map(function(value) {
//                                      return posts[value]});
//
//         if (title === undefined) {
//             res.status(503);
//             res.render('blog', {posts: postList});
//         } else {
//             var post = posts[title] || {};
//             res.render('post', {post: post});
//         }
//     });
// });

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

app.use(function(req, res) {
    res.status(404);
    res.render('404.pug', {title: '404: File Not Found'});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
