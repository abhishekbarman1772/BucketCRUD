const express = require('express');
require('express-async-errors');
const errHandler = require('../middleware/error');

const router = express.Router();
const posts = require('./posts');
const tags = require('./tags');

router.use('/posts', posts);
router.use('/tags', tags);

router.use(errHandler);

module.exports = router;
