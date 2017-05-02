var express    = require('express');
var app        = express();
var subpath    = express();
var path       = require('path');
var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2));

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/node_modules', express.static(__dirname + '../node_modules'));
app.use('../server/resources', express.static(__dirname + '../server/resources'));

/*
 * For creating Swagger documentation
 *
 * ------------------------------------------------
 */
 app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('server/dist'));
app.use(express.static(path.join(__dirname, '../server/resources')));

app.get('/docs', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

// Set api-doc path
swagger.configureSwaggerPaths('', 'server/dist/api-docs', '');
swagger.configure('http://localhost:8080/', '1.0.0');

/* ------------------------------------------------ */

app.use('/api', require('./app/controllers/cities'));
app.use('/api', require('./app/controllers/rent'));
app.use('/api', require('./app/controllers/nightlife'));
app.use('/api', require('./app/controllers/broadband'));
app.use('/api', require('./app/controllers/crimes'));
app.use('/api', require('./app/controllers/wage'));


app.get('/api/status', (req, res, next) => {
  res.json({ message: 'API is up and available.' });
});

app.listen(port);
console.log('Server listening on port ' + port + "...")

exports = module.exports = app;
