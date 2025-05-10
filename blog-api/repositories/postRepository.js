const { Op } = require('sequelize');
const Post = require('../models/Post');

const createPost = async (title, content, tags, userId) => {
  try {
    const post = await Post.create({ title, content, tags, userId });
    return post;
  } catch (error) {
    throw new Error('Failed to create post');
  }
};

const getAllPosts = async ({ tag, limit, offset }) => {
  try {
    const whereCondition = tag ? { tags: { [Op.contains]: [tag] } } : {};

    const posts = await Post.findAll({
      where: whereCondition,
      limit,
      offset,
    });

    const totalCount = await Post.count({ where: whereCondition });
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / limit) : 1;

    return { posts, totalPages };
  } catch (error) {
    throw new Error("Failed to fetch posts");
  }
};

const getPostCount = async ({ tag }) => {
  try {
    const query = tag ? { where: { tags: { [Op.contains]: [tag] } } } : {};
    const count = await Post.count(query);
    return count;
  } catch (error) {
    throw new Error('Failed to count posts');
  }
};

const getPostById = async (id) => {
  try {
    const post = await Post.findByPk(id);
    if (!post) throw new Error('Post not found');
    return post;
  } catch (error) {
    throw new Error('Failed to fetch post');
  }
};

const updatePost = async (id, title, content, tags) => {
  try {
    const post = await Post.findByPk(id);
    if (!post) throw new Error('Post not found');
    post.title = title;
    post.content = content;
    post.tags = tags;
    await post.save();
    return post;
  } catch (error) {
    throw new Error('Failed to update post');
  }
};

const deletePost = async (id) => {
  try {
    const post = await Post.findByPk(id);
    if (post) {
      await post.destroy();
    } else {
      throw new Error('Post not found');
    }
  } catch (error) {
    throw new Error('Failed to delete post');
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostCount,
  getPostById,
  updatePost,
  deletePost,
};
