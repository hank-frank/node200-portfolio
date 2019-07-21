var express = require('express')
var router = express.Router()

//router specific middleware
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
//defining home page route
router.get('/', function(req, res) {
    res.send('Hello World')
}) 
//define the about route
router.get('/about', function(req, res) {
    res.send('About Me')
})

module.exports = router
