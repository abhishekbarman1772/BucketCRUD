const Joi = require('joi');

const createTags = (tags) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const result = schema.validate(tags);
  return result;
};

module.exports = {
  createTags,
};
