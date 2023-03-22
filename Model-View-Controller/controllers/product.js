const Product= require('../models/product')

exports.getAddProduct=(req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

exports.PostAddProduct=(req, res, next) => {
    const product= new Product(req.body.title);
    product.save();
    res.redirect('/');
}
    

exports.getProducts=(req, res, next) => {
   Product.fetchAll((products)=>{    //callback function for getting the data into the models/product.js
    console.log(products.length)
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
    });
  };

