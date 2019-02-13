const dotenv = require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/redditClone');
const exphbs = require("express-handlebars");
const app = express();


const checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};







// require('./data/reddit-db');

//middleware
app.use(methodOverride("_method"));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
app.use(methodOverride("_method"));
app.use(cookieParser())
app.use(checkAuth)
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));




app.use(expressValidator());


//routes
const posts = require('./controllers/posts')
const comments = require('./controllers/comments')
const auth = require('./controllers/auth')
const replies = require('./controllers/replies')

app.get('/', (req, res) => {
    res.redirect('/posts')
})

app.use('/', posts)
app.use('/', comments)
app.use('/', auth)
app.use('/', replies)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("app listening on port 3000");
});

module.exports = app