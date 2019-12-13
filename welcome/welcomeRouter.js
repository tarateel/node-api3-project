const express = require('express');

const router = express.Router()

router.get('/', (req, res) => {
  res.send("<h2>Welcome to my Lambda API</h2>")
});

router.get('/api/users', (req, res) => {
  res.json({
    message: "Welcome to the users API."
  })
});

router.get('/api/:id/posts', (req, res) => {
  res.json({
    message: "Welcome to the posts API."
  })
});