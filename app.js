const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const app = express()
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: "CrayonShinchan",
  resave: false,
  saveUninitialized: false
}))
app.use(router)


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('Server is running')
})