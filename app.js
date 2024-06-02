const express = require("express");
const { hostname } = require("os");
const path = require("path")
// const bodyparser = require("body-parser")
const mongoose = require('mongoose');
const { read } = require("fs");
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/contactdance');}
const app = express()
const port = 3000;
//Defining mongoose scheme

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
app.use(express.json())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'view')) // Set the views directory
 
//end point
app.get('/', (req, res)=>{
    const params ={ }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
  const params ={ }
  res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
  res.send("This item has been saved to the database")
  }).catch(()=>{
  res.status(400).send("item was not saved to the databse")
})
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


