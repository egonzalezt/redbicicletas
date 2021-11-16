var {collection} = require('../config/settings.json');
var dbconn = require('../database/conection');

async function insertData(query){
    const db = await dbconn.mongoDBConnection();
    db.collection(collection).insertOne(query, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
}

async function findId(id){
    const db = await dbconn.mongoDBConnection();
    const query = { "id": id };
    return new Promise(function(resolve, reject){ 
        db.collection(collection).find(query).toArray(function(err, result) {
            if (err) reject(err)
            resolve(result);
        });
    });
}

async function allBicis(){
    const db = await dbconn.mongoDBConnection();
    return new Promise(function(resolve, reject){ 
        db.collection(collection).find({}).toArray(function(err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function allBicisLocation(){
    const db = await dbconn.mongoDBConnection();
    return new Promise(function(resolve, reject){ 
        db.collection(collection).find({}, { projection: { _id: 0, ubicacion: 1} }).toArray(function(err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function updateBici(id,values){
    const db = await dbconn.mongoDBConnection();
    return new Promise(function(resolve, reject){ 
        var myquery = { id: id };
        var newvalues = { $set: values };
        db.collection(collection).updateOne(myquery, newvalues, function(err, res) {
            if (err) reject(err);
            console.log("1 document updated");
            resolve(res);
        });
    });
}

async function deleteBici(id){
    const db = await dbconn.mongoDBConnection();
    return new Promise(function(resolve, reject){ 
        var myquery = { id: id };
        db.collection(collection).deleteOne(myquery, function(err, obj) {
            if (err) reject(err);
            console.log("1 document deleted");
            resolve(obj);
        });
    });
}

module.exports = {
    insertData,findId,allBicis,updateBici,deleteBici,allBicisLocation
}