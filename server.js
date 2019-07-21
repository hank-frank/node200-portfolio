const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express(); 

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

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

app.listen(8080, () => {
    console.log('listening at http://localhost:8080 brosef, come check it out.')
});