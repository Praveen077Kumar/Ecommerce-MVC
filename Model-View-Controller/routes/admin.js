const productControllers= require('../controllers/product') //importing controller file
const express = require('express');
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productControllers.getAddProduct);
// /admin/add-product => POST
router.post('/add-product', productControllers.PostAddProduct);

module.exports= router
