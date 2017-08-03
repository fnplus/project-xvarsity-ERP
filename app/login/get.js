"use strict"

const request = require('request-promise-native')

const config = require('../../config')

module.exports = (req, res) => {
	let option = {
		uri: `${config.evarsity.url}`,
		json: true
	}
	request(option)
		.then((response) => {
			req.session.user = response[1]
			res.render('login/webpage',
				{
					captcha: response[0]
				}
			)
		})
		.catch((err) => {
			req.log.error(err)
			res.redirect('/')
		})
}