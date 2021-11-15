var MongoClient = require('mongodb').MongoClient;
var {dburl,dbcollection} = require('./settings.json')
var url = dburl+dbcollection;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("Bicicleta", function(err, res) {
      if (err) throw err;
      console.log("Collection Bicicleta created!");
      db.close();
    });
});