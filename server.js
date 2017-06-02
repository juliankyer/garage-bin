const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Garage Server';

app.get('/api/v1/items', (request, response) => {
  database('garage').select()
    .then(items => response.status(200).json(items))
    .catch(error => response.status(500).json(error));
});

app.post('/api/v1/items', (request, response) => {
  const item = request.body;
  
  if (!item.name || !item.reason || !item.cleanliness) {
    response.status(400).json({error: 'Make sure all data fields are present.'});
  } else {
    database('garage').insert(item, 'id')
    .then(ids => response.status(201).json({ id: ids[0] }))
    .catch(error => response.status(500).json(error))
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;