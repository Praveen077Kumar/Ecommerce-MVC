const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const errorController= require('./controllers/error')

//importing the Routes files
const adminRoute = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//setup the template Engines
app.set('view engine', 'ejs');
app.set('views', 'views');

//methods for path and body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoute);
app.use(shopRoutes);
app.use(errorController.get404);

//Listner Port Setup
app.listen(3030);
