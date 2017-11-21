'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const secret = require('./config');
require('dotenv').config();

const server = new Hapi.Server();

// The connection object takes some
// configuration, including the port
mongoose.Promise = global.Promise;
// const dbUrl = `mongodb://${process.env.MONGO_HOST || localhost }:${process.env.MONGO_PORT || 27017 }/${process.env.DB_NAME || jokerbet}`;
// const dbUrl = `mongodb://localhost:27017/jokerbet`;
// const dbUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`;
const dbUrl = `mongodb://${process.env.MONGO_HOST}/jokerbet`;

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
  mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    if (err) {
      throw err;
    }
  });
  console.info(`Server started at ${server.info.uri}`);
});
