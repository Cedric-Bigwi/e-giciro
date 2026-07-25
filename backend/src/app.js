require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const offerRoutes = require('./routes/offerRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
  })
);
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'e-Giciro API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    app.listen(PORT, () => {
      console.log(`e-Giciro API listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start the server:', err);
    process.exit(1);
  }
}

start();

module.exports = app;
