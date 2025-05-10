const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL , {
  dialect: 'postgres',
  logging: false, 
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

module.exports = { sequelize, connectDatabase };
