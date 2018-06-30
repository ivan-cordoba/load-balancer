require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

const urls = [];
let count = 0;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/lb', express.static(path.join(__dirname, 'public')));
app.use('/:id', express.static(path.join(__dirname, 'client')));

app.get('/api/*', (req, res) => {
  if (!urls.length) {
    res.send('Load Balancer is Empty!');
  } else {
    if (count === urls.length) count = 0;
    res.redirect(`${urls[count]}${req.path}?start=${req.query.start}&end=${req.query.end}`);
    count ++;
  }
})

app.use(bodyParser.json());

app.post('/api/server', (req, res) => {
  urls.push(req.body.serverName);
  console.log(urls);
  res.send();
});

app.post('/api/loaderio', (req, res) => {
  const verification = req.body.loader;
  fs.writeFile(`./public/${verification}.txt`, verification, (err) => {
    if (err) console.error(err);
  });
  res.send();
});

app.listen(8080);