'use strict';

const Boom = require('boom');
const Article = require('../model/Article');

module.exports = {
  method: 'POST',
  path: '/api/articles',
  config: {
    handler: (req, res) => {
      let article = new Article();

      article.title = req.payload.title;
      article.bodyUrl = req.payload.bodyUrl
      article.imageUrl = req.payload.imageUrl;
      article.author = req.payload.author;
  
      article.save((err, article) => {
        if (err) {
          res(Boom.badRequest(err));
          throw Boom.badRequest(err);
        }
        // If the user is saved successfully, issue a JWT
        res({
            article: article
        }).code(201);
      });  
    },
    // Validate the payload against the Joi schema
    // validate: {
    //   payload: createUserSchema
    // } 
    auth: false
  }
}