const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('hello world');
});

app.use('/api/dogs', require('./routes/dogs'));

app.listen(3001, () => {
	console.log('listening on 3001');
});
