const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const app = express()
require('./config/mongoose')
const authenticator = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  }
  res.redirect('/users/login');
}

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  secret: "CrayonShinchan",
  resave: false,
  saveUninitialized: false
}))

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn
  res.locals.user = req.user
  next()
})

app.use((req, res, next) => {
  req.user = req.session.user;
  next()
});

app.use(router)

app.listen(3000, () => {
  console.log('Server is running')
})