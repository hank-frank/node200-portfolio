const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var profile = require('./profile')

const app = express(); 

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
//these two are giving the server/ejs render access to the js/css files in these public/client folders
app.use(express.static('public'))
app.use(express.static('client'))
//defining the route that will be teh custom router
app.use('/profile', profile)

//setting views directory to be ./views, now app knows where to find template files
app.set('views', "./views");

//setting default engine to be ejs, express will require it for us
app.set('view engine', 'ejs');

//instead of res.send using res.render to send output of the template by filename
app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: 'Henry',
            lastName: "Frank",
        }
    }

    res.render('index', data);
});

app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/', (req, res) => {
    res.render('thanks', {contact: req.body})
})



app.listen(8080, () => {
    console.log('listening at http://localhost:8080 brosef, come check it out.')
});