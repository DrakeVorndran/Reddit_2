const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/redditClone');
const exphbs = require("express-handlebars");
const app = express();


const posts = require('./controllers/posts')
const comments = require('./controllers/comments')
// require('./data/reddit-db');

//middleware
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');
app.use(methodOverride("_method"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());


//routes
app.get('/', (req, res) => {
    res.redirect('/posts')
})

app.use('/', posts)
app.use('/', comments)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("app listening on port 3000");
});

module.exports = app