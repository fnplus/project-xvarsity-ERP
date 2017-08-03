"use strict"

const request = require('request-promise-native')

const config = require('../../config')

module.exports = (req, res, next) => {
	if (req.session.user && req.body && req.body.regno && req.body.pass && req.body.captcha) {
		let basicAuth = new Buffer(`${req.body.regno}:${req.body.pass}`).toString('base64')
		let option = {
			uri: `${config.evarsity.url}/login/${req.session.user}/${req.body.captcha}`,
			headers: {
				Authorization: `Basic ${basicAuth}`
			}
		}
		request(option)
			.then( response => {
				res.redirect('/profile')
			})
			.catch( err => {
				req.log.error(err)
				res.redirect('/logout')
			})
	} else {
		next()
	}
}