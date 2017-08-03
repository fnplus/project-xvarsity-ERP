module.exports = (req, res) => {
	if (req.session.user) {
		delete req.session.user
	}
	res.redirect('/')
}