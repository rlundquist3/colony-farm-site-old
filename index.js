var express = require('express');
var nodemailer = require('nodemailer');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', function(request, response) {
  response.render('index');
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
