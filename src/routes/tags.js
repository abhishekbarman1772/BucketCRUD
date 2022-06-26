const express = require('express');

const router = express.Router();

const TagsController = require('../controllers/TagsController');

const { addTags, deleteTag } = new TagsController();

router.post('/addTags', addTags);
router.post('/deleteTag', deleteTag);

module.exports = router;
