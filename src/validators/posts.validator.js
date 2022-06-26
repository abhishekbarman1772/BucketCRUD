const Joi = require('joi');

const createPost = (post) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    tags: Joi.exist(),
  });
  const result = schema.validate(post);
  return result;
};

module.exports = {
  createPost,
};
