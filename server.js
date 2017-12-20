'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const secret = require('./config');
require('dotenv').config();

const server = new Hapi.Server();

mongoose.Promise = global.Promise;
const options = {
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

const db = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  name: process.env.DB_NAME
}

const dbUrl = `mongodb://${db.host || localhost }:${db.port || 27017 }/${db.name || jokerbet}`;
// const dbUrl = `mongodb://localhost:27017/jokerbet`;
// const dbUrl = `mongodb://${process.env.MONGO_HOST}/jokerbet`;

server.connection({
  port: process.env.PORT || 3000,
  routes: {
    cors: {
      // change this for production
      origin: ['*']
    }
  }
});

server.register(require('hapi-auth-jwt'), err => {
  // We are giving the strategy a name of 'jwt'
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: secret,
    verifyOptions: { algorithms: ['HS256'] }
  });

  // Look through the routes in
  // all the subdirectories of API
  // and create a new route for each
  glob
    .sync('api/**/routes/*.js', {
      root: __dirname
    })
    .forEach(file => {
      const route = require(path.join(__dirname, file));
      server.route(route);
    });
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  // Once started, connect to Mongo through Mongoose
  mongoose.connect(dbUrl, options).then(
    () => {},
    err => { throw err }
  );
  console.info(`Server started at ${server.info.uri}`);
  
});

// // Start the server
// server.start((err) => {
//   if (err) {
//     throw err;
//   }
//   // Once started, connect to Mongo through Mongoose
//   mongoose.connect(dbUrl).then(
//     () => {},
//     err => { throw err }
//   );
//   console.info(`Server started at ${server.info.uri}`);
  
// });
