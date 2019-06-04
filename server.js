const express = require('express')
const app = express()
const port = 3000

const fs = require('fs');

var avgorande = JSON.parse(fs.readFileSync('avgorande.json', 'utf8'));


app.put('/api/etag', (req, res) => {
    avgorande.id = 1;
    avgorande.version = avgorande.version + 1;
    console.log('---POST---', avgorande.id, avgorande.version);
    res.status(200)
    return res.send();
});

app.post('/api/etag', (req, res) => {
    avgorande.id = 1;
    avgorande.version = 1;
    console.log('---POST---', avgorande.id, avgorande.version);
    return res.send(JSON.stringify({id:avgorande.id}));
});

app.get('/api/etag', (req, res) => {
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




app.put('/api', (req, res) => {
    avgorande.id = 1;
    avgorande.version = avgorande.version + 1;
    console.log('---POST---', avgorande.id, avgorande.version);
    res.status(200)
    return res.send({
        id: avgorande.id,
        version: avgorande.version
    });
});

app.post('/api', (req, res) => {
    avgorande.id = 1;
    avgorande.version = 1;
    console.log('---POST---', avgorande.id, avgorande.version);
    return res.send(JSON.stringify({id:avgorande.id}));
});

app.get('/api/:id/:version', (req, res) => {
    if (typeof avgorande.version === 'undefined') {
        avgorande.version = 1;
    }

    res.setHeader('Content-Type', 'application/json');

    res.set('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=2592000');
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    //res.set('etag', 'W/' + avgorande.version);    

    console.log('---GET---', avgorande.id, avgorande.version);
    return res.send(JSON.stringify(avgorande));
});


app.get('/api', (req, res) => {
    console.log('simple');
    if (typeof avgorande.version === 'undefined') {
        avgorande.version = 1;
    }

    res.setHeader('Content-Type', 'application/json');

    res.set('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=2592000');
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    //res.set('etag', 'W/' + avgorande.version);    

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