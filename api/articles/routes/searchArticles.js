'use strict';

const Article = require('../model/Article');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/articles/search',
  config: {
    handler: (req, res) => {
        const queryParams = req.query;
        console.log(queryParams);

        Article.find({'title' : {$regex : queryParams.title} })
        .exec((err, Articles) => {
          if (err) {
            // res(Boom.badRequest(err));
            // throw Boom.badRequest(err);
          }
          if (!Articles.length) {
            // res(Boom.notFound('Article not found!'));
            // throw Boom.notFound('No Articles found!');
          }
          res({
            success: true,
            articles: Articles
        }).code(200);
          
        });
    },
    auth: false
  }
};