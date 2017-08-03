"use strict"

const request = require('request-promise-native')

const config = require('../../config')

module.exports = (req, res, next) => {
	if (req.session.user) {
		req.log.trace(req.session.user)
		let option = {
			uri: `${config.evarsity.url}/grades/${req.session.user}`,
		}
		request(option)
			.then( response => {
				let json = JSON.parse(response)
				let semesters = []
				let cgpa = null
				for (let i = 1; i <= 8; i++) {
					let semester = {}
					if (`sem${i}` in json) {
						semester.subjects = json[`sem${i}`]
					}
					if (`sgpa${i}` in json) {
						semester.gpa = json[`sgpa${i}`]
					}
					if (Object.keys(semester).length > 0) {
						semesters.push(semester)
					}
				}
				if ("cgpa" in json) {
					cgpa = json["cgpa"]
				}
				res.render('grades/webpage',
					{
						semesters: semesters,
						cgpa: cgpa
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