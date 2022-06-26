const Tags = require('../models/Tag');
const { mongoIdVal } = require('../utils/helpers');
const BadRequestError = require('../handlers/error/BadRequestError');
const { createTags } = require('../validators/tags.validator');

class TagsController {
  /**
 * @name addTags
 * @description Adding a tag.
 * @param {string} name
 */
  async addTags(req, res) {
    const { name } = req.body;

    const { error } = createTags(req.body);
    if (error) {
      throw new BadRequestError(
        error.details[0].message,
      );
    }
    const tags = new Tags({ name });

    await tags.save();

    return res.send({ tags });
  }

  /**
 * @name deleteTag
 * @description Removing a tag.
 * @param {Object} tagId
 */
  async deleteTag(req, res) {
    const { tagId } = req.body;
    if (!mongoIdVal(tagId)) throw new BadRequestError('Please enter a valid mongoId');

    await Tags.remove({ _id: tagId });

    return res.send({ message: 'Tag Removed' });
  }
}

module.exports = TagsController;
