//Install express server
const express = require('express')
const path = require('path')

const app = express()

// Serve only the static files form the dist directory
app.use(express.static('./dist/my-app'))
// app.use(express.static(__dirname + '/dist/restaurant-rater-client'))

app.get('/*', function (req, res) {
  // res.sendFile(
  //   path.join(__dirname + '/dist/restaurant-rater-client/index.html')
  // )
  res.sendFile('index.html', { root: 'dist/my-app' })
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080)
