const express = require('express')
const app = express()
const port = 3000

const fs = require('fs');

var avgorande = JSON.parse(fs.readFileSync('avgorande.json', 'utf8'));

app.put('/api', (req, res) => {
    avgorande.id = 1;
    avgorande.version = avgorande.version +1;
    console.log('---PUT---', avgorande.id, avgorande.version);
    return res.send(JSON.stringify(avgorande));
});

app.post('/api', (req, res) => {
    avgorande.id = 1;
    console.log('---POST---', avgorande.id, avgorande.version);
    return res.send(JSON.stringify({id:avgorande.id}));
});

app.get('/api', (req, res) => {
    if (typeof avgorande.version === 'undefined') {
        avgorande.version = 1;
    }

    res.setHeader('Content-Type', 'application/json');

    res.set('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=2592000');
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    res.set('etag', avgorande.version);    

    console.log('---GET---', avgorande.id, avgorande.version);
    return res.send(JSON.stringify(avgorande));
});

app.get('/api2', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.set('etag', 2);
    res.set('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=2592000');
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    console.log('---GET---', avgorande.id, avgorande.version);
    return res.send(JSON.stringify(avgorande));
});

app.get('/', function(req, res) {
    console.log('----> html');
    res.set('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=2592000');
    res.sendFile('/Users/demassinner/Desktop/fubar/index.html');
});

app.get('/js/*', function(req, res) {
    console.log('----> js');
    res.set('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=2592000');
    res.sendFile('/Users/demassinner/Desktop/fubar/client.js');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))