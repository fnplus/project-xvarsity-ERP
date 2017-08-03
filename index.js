const app = require('./app')

app.set('port', process.env.PORT || 60000)
app.listen(app.get('port'))