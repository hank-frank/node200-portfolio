const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
var profile = require('./profile');

dotenv.config();

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
        projectData1: {
            title: 'Mortgage Calculator',
            description: "This is a morgage calculator. It was built with Node, Express and React and styled with Bootstrap.",
            herokuLink: "https://hf-mortgage-calcualtor.herokuapp.com/",
            gitHubLink: "https://github.com/hank-frank/react100-mortgage-calc",
            onClickFunction: "mortgageProjectToggle()"
        },
        projectData2: {
            title: 'Change Calcualtor',
            description: "This is a simple change calculator. It was built with Node, Express and React and styled with Bootstrap.",
            herokuLink: "https://classique-bastille-82710.herokuapp.com//",
            gitHubLink: "https://github.com/hank-frank/react100-change-calc",
            onClickFunction: "changeProjectToggle()"
        },
        projectData3: {
            title: 'Flight Search',
            description: "This is a flight and weather search. It is built for my use as a flight attandant when using non-revenue travel, I don't want flight search info to include price or be limited by airline, only the full list of flights between two cities onany given day. This It was built with Node, Express and React and styled with Bootstrap.",
            herokuLink: `https://hf-flight-search.herokuapp.com/`,
            gitHubLink: `https://github.com/hank-frank/react100-hackathon`,
            onClickFunction: "flightProjectToggle()"
        },
        projectData4: {
            title: "To Do Tracker",
            description: "This is a Very Simple To Do app. It takes in to do items and adds them to a list with different priorities.hey can be edited, marked as complete and deleted. It was built with Node, Express and React and styled with Bootstrap.",
            herokuLink: "https://hf-reac100t-vstda.herokuapp.com/",
            gitHubLink: "https://github.com/hank-frank/react-100-vstda",
            onClickFunction: "todoProjectToggle()"
        },
        projectData5: {
            title: "San Diego's Top Spots",
            description: "This is a list of some of San Deigo's top 30 spots. It was built with Node, Express and React and styled with Bootstrap.",
            herokuLink: "https://hf-san-diego-top-spots.herokuapp.com/",
            gitHubLink: "https://github.com/hank-frank/react100-san-diego-top-spots",
            onClickFunction: "topProjectToggle()"
        },
        
    }

    res.render('index', data);
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/about', (req, res) => {
    res.render('about');
})

app.post('/thanks', (req, res) => {
    const { firstName, lastName, email } = req.body;
  
    //sends form data to Google Sheets
    let formData =
      'firstName=' + encodeURIComponent(firstName) +
      '&lastName=' + encodeURIComponent(lastName) +
      '&email=' + encodeURIComponent(email)
    //   '&subject=' + encodeURIComponent(subject) +
    //   '&message=' + encodeURIComponent(message);
  
    const scriptURL = process.env.SCRIPT_URL.toString();
  
    axios({
        method: 'post',
        url: scriptURL,
        data: formData
      })
      .catch(error => console.error('Error!', error.message));
  
    //thanks the contact by name
    const contact = { firstName, lastName };
    console.log(contact);
  
    res.render('thanks', { contact });
  });

app.listen(8080, () => {
    console.log('listening at http://localhost:8080 brosef, come check it out.')
});