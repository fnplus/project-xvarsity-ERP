"use strict"

const request = require('request-promise-native')

const config = require('../../config')

module.exports = (req, res, next) => {
	if (req.session.user) {
		req.log.trace(req.session.user)
		let option = {
			uri: `${config.evarsity.url}/attendance/${req.session.user}`,
		}
		request(option)
			.then( response => {
				let json = JSON.parse(response)
				let header = json.shift()
				res.render('attendance/webpage', 
					{
						header: header,
						subjects: json
					})
			})
			.catch( err => {
				req.log.error(err)
				res.redirect('/logout')
			})
	} else {
		next()
	}
}