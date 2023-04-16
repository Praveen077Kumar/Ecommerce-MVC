const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const Cart = require('./models/cart');
const Cart_item = require('./models/cart-item');
const Product= require('./models/product');
const User= require('./models/user');
const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res,next) =>{
    User.findByPk(1)
    .then((user) =>{
        req.user = user;
        next();
    })
    .catch((err) => console.log(err));
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User, { constaints: true,onDelete:'CASCADE' });
User.hasMany(Product)
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:Cart_item});
Product.belongsToMany(Cart,{through:Cart_item});


const sequelize = require('./util/database')
sequelize
// .sync({force: true})
.sync()
.then(result =>{
   return User.findByPk(1);
}).then(user =>{
    if(!user){
        return User.create({name:'Max',email:'Max1234@gmail.com'})
    }
    return user;
})
.then(user =>{
    return user.createCart();
})
.then(user=>{
    app.listen(3000);
})
.catch(err => {
    console.log(err)
});

