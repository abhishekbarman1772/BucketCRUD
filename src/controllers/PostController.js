const Posts = require('../models/Posts');
const BadRequestError = require('../handlers/error/BadRequestError');
const { createPost } = require('../validators/posts.validator');
const { mongoIdVal, getPagination } = require('../utils/helpers');
const { uploadMega, getFileURL } = require('../utils/megaUtil');

class PostController {
/**
 * @name addPost
 * @description Adding the post.
 * @param {string} title
 * @param {string} desc
 * @param {File} postImage
 * @param {Array} tags
 */
  async addPost(req, res) {
    const { body: { title, desc, tags }, file: { path, filename, size } } = req;
    const tagsArr = Array.isArray(tags) ? tags : [tags];

    if (tagsArr.filter((x) => !mongoIdVal(x)).length !== 0) {
      throw new BadRequestError('Please enter a valid mongoId');
    }
    const { error } = createPost(req.body);
    if (error) {
      throw new BadRequestError(
        error.details[0].message,
      );
    }

    await uploadMega({ size, filename, path: `./${path}` });

    const posts = new Posts({
      title, desc, filename, tags: tagsArr, fileURL: await getFileURL(filename),
    });
    await posts.save();

    return res.send({ posts });
  }

  /**
 *  @name changePost
 * @description changing the post.
 * @param {string} title
 * @param {string} desc
 * @param {Array} tags
 * @param {ObjectId} postId
 */
  async changePost(req, res) {
    const {
      title, desc, tags, postId,
    } = req.body;

    if (!postId) {
      throw new BadRequestError('Please enter correct postId');
    }

    let tagsArr;
    const updateObj = {};

    if (tags) {
      tagsArr = Array.isArray(tags) ? tags : [tags];

      if (tags.filter((x) => !mongoIdVal(x)).length !== 0) {
        throw new BadRequestError('Please enter a valid mongoId');
      }

      updateObj.$push = { tags: { $each: tagsArr } };
    }

    if (title || desc) updateObj.$set = {};

    if (title) updateObj.$set.title = title;
    if (desc) updateObj.$set.desc = desc;

    await Posts.findByIdAndUpdate(
      { _id: postId },
      {
        ...updateObj,
      },
    );

    return res.send({ message: 'Post Data Updated' });
  }

  /**
 *  @name getPosts
 * @description getting the posts by skip,limit and sort based.
 * @param {string} limit
 * @param {string} skip
 * @param {string} sort
 */

  async getPosts(req, res) {
    const { limit, skip, sort } = await getPagination(req.query);

    const totalCount = await Posts.countDocuments({});

    const posts = await Posts.find({ }).populate('tags')
      .sort(sort)
      .limit(limit)
      .skip(skip);

    return res.send({ posts, totalCount });
  }

  /**
 *  @name getPostsByTags
 * @description getting the posts by tagId where tagId can be single Id or and array.
 * @param {string} limit
 * @param {string} skip
 * @param {string} sort
 * @param {Array} tags
 */
  async getPostsByTags(req, res) {
    const { tagIds } = req.query;
    const { limit, skip, sort } = await getPagination(req.query);

    const totalCount = await Posts.countDocuments({});

    const tagsArr = Array.isArray(tagIds) ? tagIds : [tagIds];

    const query = {
      tags: { $in: tagsArr },
    };

    const posts = await Posts.find(query).populate('tags')
      .sort(sort)
      .limit(limit)
      .skip(skip);

    return res.send({ posts, totalCount });
  }

  /**
 *  @name searchPosts
 * @description getting the posts by searching by title(title) and description(desc).
 * @param {string} limit
 * @param {string} skip
 * @param {string} sort
 * @param {string} title
 * @param {string} desc
 */
  async searchPosts(req, res) {
    const { title, desc } = req.query;
    const { limit, skip, sort } = await getPagination(req.query);

    const totalCount = await Posts.countDocuments({});
    const query = { };

    if (desc || title) query.$or = [];

    if (desc) query.$or.push({ desc: { $regex: new RegExp(desc) } });
    if (title) query.$or.push({ title: { $regex: new RegExp(title) } });

    const posts = await Posts.find(query).populate('tags')
      .sort(sort)
      .limit(limit)
      .skip(skip);

    return res.send({ posts, totalCount });
  }
}

module.exports = PostController;
