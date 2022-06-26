const express = require('express');

const router = express.Router();
const upload = require('../utils/multer');

const PostController = require('../controllers/PostController');

const {
  addPost, changePost, getPosts, getPostsByTags, searchPosts,
} = new PostController();

router.post('/add', upload.single('postImage'), addPost);
router.put('/changePost', changePost);
router.get('/getPost', getPosts);
router.get('/getPostByTags', getPostsByTags);
router.get('/searchPosts', searchPosts);

module.exports = router;
