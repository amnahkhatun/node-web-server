//creating server

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//using middleware
app.use(express.static(__dirname + '/public'))
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append file to server log')
    }
  })
next();
})


hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
return text.toUpperCase();
})

// app.get('/', (req, res) => { //routing
//   //res.send('<h1> Hello world </h1>'); //sending HTML data
//
//   //sending JSON
//     res.send({
//       name: 'Amnah',
//       likes: [
//         'Photography',
//        'Travelling'
//      ]
//     })
// })

app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my page'
  })
})

app.get('/about', (req, res) => {
  //passing static data to about.hbs
  res.render('about.hbs', {
    pageTitle: 'About page',
  })
})

app.listen(3000, () =>{
  console.log('listening to port 3000')
}); //calling port
