//Install express server
const express = require('express')
const path = require('path')
// const environment = require ('./src/environments/environment')

const app = express()

// Redirect to https
// if (environment.production) {
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https')
    res.redirect(`https://${req.header('host')}${req.url}`)
  else next()
})
// }

// Serve only the static files form the dist directory
app.use(express.static('./dist/my-app'))

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/my-app' })
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080)
