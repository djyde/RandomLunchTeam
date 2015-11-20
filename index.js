'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let Random = require('./random');

app.use(bodyParser.urlencoded({extended: true}));

app.post('/group', (req,res) => {
  const config = require('./config')
  let text = req.body.text;
  let random = new Random(config.members);
  let groupCount = text.match(/\d+/g)[0];
  if (text.match(/\([^)]*\)/)) {
    let except = text.match(/\([^)]*\)/)[0].replace('(','').replace(')','').split(',');
    res.json({
      text: random.except(except).group(groupCount)
    })
  } else {
    res.json({
      text: random.group(groupCount)
    })
  }
})

app.get('/', (req,res) => {
  res.send('hello');
})

app.listen(4000);

