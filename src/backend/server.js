const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config({ path: '../../.env' });

const slangHandler = require('./handlers/translateSlang');
const travelHandler = require('./handlers/predictTravel');
const foodMoodHandler = require('./handlers/foodMood');
const heritageHandler = require('./handlers/heritage');
const mindmapHandler = require('./handlers/mindmap');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.post('/api/translate-slang', slangHandler);
app.post('/api/predict-travel', travelHandler);
app.post('/api/food-mood', foodMoodHandler);
app.post('/api/mindmap', mindmapHandler);
app.get('/api/heritage/:city', heritageHandler);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`NaatuMithra Backend listening on port ${PORT}`);
});
