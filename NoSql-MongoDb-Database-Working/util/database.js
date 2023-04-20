const mongodb= require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect=callback => {
    MongoClient.connect(
        "mongodb+srv://<username>:<password>@praveencon.cmbxw.mongodb.net/shop?retryWrites=true&w=majority"
      )
        .then(client => {
          console.log("Connected successfully");
          _db= client.db('shop')
          callback(client)
        })
        .catch( error => {
          console.log("Connection failed !!!");
          throw error;
        });
};

const getDb = ()=>{
  if(_db){
    return _db;
  }
  throw 'No database Found!';
}


module.exports = mongoConnect;
module.exports= getDb;

 // hJadYASdmnfbICMN
