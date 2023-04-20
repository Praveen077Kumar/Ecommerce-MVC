const getDb = require('../util/database').getdb;

class Product{
  constructor(name, description, price, imageUrl) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
}

save(){

}
}



// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;