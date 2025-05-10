const User = require('../models/User');

const createUser = async (username, email, password ) => {
  try {
    const user = await User.create({ username, email, password });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = { createUser, findUserByEmail };
