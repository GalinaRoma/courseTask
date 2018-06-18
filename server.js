const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.render('main', {'fromMenu': app.get('fromMenu'), 'fromHeader': app.get('fromHeader'),
    'withChat': app.get('withChat')})});

app.listen(8080, () => {
    console.info('Listening on http://localhost:8080');
});

module.exports = app;