const mongodb= require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect=callback => {
    MongoClient.connect(
        "mongodb+srv://<username>:<password>@praveencon.cmbxw.mongodb.net/?retryWrites=true&w=majority"
      )
        .then((result) => {
          console.log("Connected successfully");
          callback(result)
        })
        .catch((error) => {
          console.log("Connection failed !!!");
          console.log(error);
        });
}

module.exports = mongoConnect;

 // hJadYASdmnfbICMN
