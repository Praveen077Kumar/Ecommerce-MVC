const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
// app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main-layout",layoutsDir:"views/layouts"}));

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3030);
