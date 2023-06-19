const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser')

//MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
//Mongoose schemea
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
});
const Contact = mongoose.model('Contact', contactSchema);
//EXPRESS RELATED STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG RELATED STUFF
app.set('view engine', 'pug');//Important
app.set('views', path.join(__dirname, 'views'));//Set the views directory


//ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("This item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})

//START THE SERVER
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})