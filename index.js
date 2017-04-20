'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())



// Spin up the server
app.listen(app.get('port'), function() {
console.log('running on port', app.get('port'))
})

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'EAACZA55PYf7wBANVX3HiuWdeBbds0C8QPUkEFpzZCizZCbjfW8lrcYcF6CwOL0WhfH7KE8Yy4yqdvDFZCAiFiEn6pVsE3y0wRd5HzZB19vd0LwcVa3qo1FUYKwlZBsgRmlTlJkZAs3L3Srb0FF9HrZBcihdcUFhvoiAlfZCbVKt7IDwZDZD') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});
