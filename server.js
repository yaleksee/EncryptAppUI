const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fetch = require("node-fetch");
const app = express()


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

let sessionToken = new Map();


app.get('/', function (req, res) {
    fetch('http://localhost:8080/api/v1/cryptedMessages')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
        res.render('index', {records: data, error: null});
    });
});

app.get('/login', function (req, res) {
    res.render('sign-in');
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
