const express           = require('express');
const app               = express();
const subpath           = express();
const path              = require('path');
const bodyParser        = require('body-parser');
const argv              = require('minimist')(process.argv.slice(2));
const DependencyService = require('./app/services/dependency-service');

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/node_modules', express.static(__dirname + '../node_modules'));
app.use('../server/resources', express.static(__dirname + '../server/resources/'));

/*
 * For creating Swagger documentation
 *
 * ------------------------------------------------
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const swagger = require('swagger-node-express').createNew(subpath);
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
app.use('/api', require('./app/controllers/wages'));
app.use('/api', require('./app/controllers/food'));

DependencyService.startParsing();

app.get('/api/status', (req, res, next) => {
  res.json({ message: 'API is up and available.' });
});

app.listen(port);
console.log('Server listening on port ' + port + "...")

exports = module.exports = app;
