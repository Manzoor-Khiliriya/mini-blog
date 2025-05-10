const postRepository = require('../repositories/postRepository');

const createPost = async (req, res) => {
  const { title, content, tags } = req.body;
  const userId = req.userId; 

  try {
    const post = await postRepository.createPost(title, content, tags, userId);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  const { tag, limit = 5, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { posts, totalPages } = await postRepository.getAllPosts({
      tag,
      limit: Number(limit),
      offset,
    });
    res.status(200).json({ posts, totalPages });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postRepository.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;

  try {
    const post = await postRepository.updatePost(id, title, content, tags);
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await postRepository.deletePost(id);
    res.status(204).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
