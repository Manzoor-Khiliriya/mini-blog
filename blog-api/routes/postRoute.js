const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;