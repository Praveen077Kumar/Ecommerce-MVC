const Sequelize= require('sequelize');
const sequelize= new Sequelize(
   'completeNode','root','giit12345',
   {
    dialect:'mysql',
    host: 'localhost'
});
module.exports = sequelize;

