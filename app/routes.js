"use strict"
const attendance = require('./attendance')
const calendar = require('./calendar')
const grades = require('./grades')
const home = require('./home')
const login = require('./login')
const logout = require('./logout')
const profile = require('./profile')

module.exports = (app) => {
	app.get('/', home.get)
	app.get('/login', login.get)
	app.post('/login', login.post)
	app.get('/attendance', attendance.get)
	app.get('/calendar', calendar.get)
	app.get('/grades', grades.get)
	app.get('/profile', profile.get)
	app.get('/logout', logout.get)
}