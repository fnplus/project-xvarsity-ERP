"use strict"
const path = require('path')

const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars')
const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const config = require('../config')

const app = express()

app.engine('.hbs', exphbs({
  extname: '.hbs',
  layoutsDir: path.join(__dirname),
  partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

app.use(express.static(path.join(__dirname, 'public')))

switch(app.get('env')) {
case 'development':
	app.use(require('express-bunyan-logger')({
		name: 'logger',
		streams: [{
			level: 'trace',
			stream: process.stdout
		}]
	}))
	break
case 'production':
	app.use(require('express-bunyan-logger')())
	/*add file rotation*/
	break
}

app.use(helmet())

app.use(session({
	store: new RedisStore({
		url: config.redisStore.url
	}),
	secret: config.redisStore.secret,
	resave: false,
	saveUninitialized: false
}))

app.use((req, res, next) => {
	if (!req.session) {
		throw new Error('session store not working')
	} else {
		next()
	}
})

app.use(bodyParser.urlencoded({ extended: false }))

require('./routes')(app)

app.use((req, res) => {
	res.sendStatus(404)
})

app.use((err, req, res, next) => {
	req.log.error(err)
	res.sendStatus(500)
})

module.exports = app