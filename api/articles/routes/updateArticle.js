'use strict';

const Boom = require('boom');
const Article = require('../model/Article');
const updateArticleSchema = require('../schemas/updateArticleSchema');

module.exports = {
    method: 'PATCH',
    path: '/api/articles/{id}/edit',
    config: {
      handler: (req, res) => {
        
        const id = req.params.id;
        const updatedArticle = req.payload;
        Article.findOneAndUpdate({ _id: id }, updatedArticle, (err, article) => {
          if (err) {
            res(Boom.badRequest(err));
            throw Boom.badRequest(err);
          }
          if (!article) {
            res(Boom.notFound('Article not found!').code(404));
            throw Boom.notFound('Article not found!').code(404);
          }
          res({
            message: 'Article updated!',
            article: article
        }).code(200);
        });
      },
      validate: {
        params: updateArticleSchema.paramsSchema
      },
      auth: false
    }
  };