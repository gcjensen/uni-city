var express    = require('express');
var app        = express();
var path       = require('path');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/node_modules', express.static(__dirname + '../node_modules'));
app.use('../server/resources', express.static(__dirname + '../server/resources'));

app.use('/api', require('./app/controllers/cities'));
app.use('/api', require('./app/controllers/rent'));

app.get('/api/status', (req, res, next) => {
  res.json({ message: 'API is up and available.' });
});

app.listen(port);
console.log('Server listening on port ' + port + "...")

exports = module.exports = app;
