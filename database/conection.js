const { MongoClient } = require('mongodb');
var {dburl,dbcollection} = require('../config/settings.json')

const client = new MongoClient(dburl);
let _db;

client.on('serverClosed', (event) => {
  // eslint-disable-next-line no-console
  console.log('received serverClosed');
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(event, null, 2));

  // should i call mongoDBConnection() here if connection lost while app running?
});

const mongoDBConnection = async (app) => {
  try {
    if (_db) {
      _db = client.db(dbcollection);
      return client.db(dbcollection);
    }

    await client.connect();
    if (app) app.use(passport.initialize());
    _db = client.db(dbcollection);
    return client.db(dbcollection);
  } catch (error) {
    return Promise.reject(error);
  }
};

const dbObj = () => _db;

module.exports = {
  mongoDBConnection,
  dbObj,
};