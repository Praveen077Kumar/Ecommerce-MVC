const express = require('express');
const productController=require('../controllers/product') //importing controller file

const router = express.Router();  //instance creation for Router method 

router.get('/',productController.getProducts);  //reference for the controller function

module.exports = router;   //exporting the router