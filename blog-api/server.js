const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoute');
const { sequelize } = require('./config/db'); 
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
