const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');  

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,  
  tableName: 'posts', 
});

Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Post;