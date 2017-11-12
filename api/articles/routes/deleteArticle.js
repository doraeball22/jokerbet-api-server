'use strict';

const Article = require('../model/Article');
const Boom = require('boom');

module.exports = {
    method: 'DELETE',
    path: '/api/articles/{id}',
    config: {
      handler: (req, res) => {
        const id = req.params.id;
        const query = Article.findOneAndRemove({
            _id: id
        });
        query.exec(function (err, article) {
            if (err) {
                res(Boom.badRequest(err));
                throw Boom.badRequest(err);
            }
            if (!article) {
                res(Boom.notFound('Article not found!'));
                throw Boom.notFound('Article not found!');
              }
            res({
                message: 'This Article has Deleted!'
            }).code(200);
        })
      },
      auth: false
    }
  };