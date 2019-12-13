const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error fetching posts."
      })
    })
});

router.get('/:id', validatePostId(), (req, res) => {
  posts.getById()
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error retrieving the post."
      })
    })
});

router.delete('/:id', validatePostId(), (req, res) => {
  const { post_id } = req.params.id;

  posts.remove(post_id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `Successfully deleted ${count} post(s).`
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error deleting post."
      })
    })
});

router.put('/:id', validatePostId(), (req, res) => {
  const postChanges = {
    post_id: req.params.id,
    reqBody: req.body
  }

  posts.update(postChanges)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error saving changes to the post."
      })
    })
});

// custom middleware
function validatePostId(req, res, next) {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "missing post data"
      })
    } else if (!req.body.text) {
      res.status(400).json({
        message: "missing required text field"
      })
    } else {
      next()
    }
  };
}

module.exports = router;
