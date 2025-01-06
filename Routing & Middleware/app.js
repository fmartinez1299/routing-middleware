const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Error Handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
