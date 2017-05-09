const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	return next();
});

app.get('/', (req, res) => {
	res.send('hello world');
});

app.use('/api/dogs', require('./routes/dogs'));

app.listen(3001, () => {
	console.log('listening on 3001');
});
