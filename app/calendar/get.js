"use strict"

module.exports = (req, res, next) => {
	if (req.session.user) {
		res.render('calendar/webpage')
	} else {
		next()
	}
}