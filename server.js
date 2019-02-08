
const express = require('express');
const port = 3000;
const path = require('path');

const app = express();

function listenCB () {
    console.log('now we are running server on port: ' + port);
};

function addStatic () {
    return express.static(path.join(__dirname, 'public'));
}

// Now let's add the static files with express middleware
app.use(addStatic());

app.listen(port, listenCB);