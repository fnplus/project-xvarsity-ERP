"use strict"

const request = require('request-promise-native')

const config = require('../../config')

module.exports = (req, res, next) => {
	if (req.session.user) {
		req.log.trace(req.session.user)
		let option = {
			uri: `${config.evarsity.url}/profile/${req.session.user}`,
		}
		request(option)
			.then( response => {
				let json = JSON.parse(response)
				let image = json.image
				delete json.image
				res.render('profile/webpage',
					{
						details: json,
						image: image
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