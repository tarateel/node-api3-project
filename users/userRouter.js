const express = require('express');
const users = require('../users/userDb');
const posts = require('../posts/postRouter');
const { validateUser, validateUserId } = require('../middleware/validateUser');
const { validatePost } = require('../middleware/validatePost');2

const router = express.Router();

router.post('/', validateUser(), async (req, res) => {
  const { newUser } = req.body.name;
  users.insert({ newUser })
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(err => {
    res.status(500).json({
      errorMessage: "Error saving user to the database."
    })
  });
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  const newPost = {
    text: req.body.text,
    user_id: req.params.id
  }

  posts.insert(newPost)
    .then(newPost => {
      res.status(201).json(newPost)
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error saving the post."
      })
    })
});

router.get('/', (req, res) => {
  users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error fetching the user database."
      })
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  const { user_id } = req.params.id;

  users.getById(user_id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error fetching the user."
      })
    })
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  const { user_id } = req.params.id;

  users.getUserPosts(user_id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error fetching the user posts."
      })
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  const { user_id } = req.params.id;
  const { userName } = req.params.name

  users.remove(user_id)
    .then(() => {
      res.status(200).json({
        message: `Successfully deleted ${userName}.`
      })
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error deleting the user from the database."
      })
    })
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  const userData = {
    user_id: req.params.id,
    reqBody: req.body
  }

  users.update(userData)
    .then(() => {
      res.json(202).json({
        message: "User successfully updated."
      })
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error updating the user in the database."
      })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  return (req, res, next) => {
    users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(400).json({
          message: "invalid user id"
        })
      }
    })
  };
}

function validateUser(req, res, next) {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "missing user data"
      })
    } else if (!req.body.name) {
      res.status(400).json({
        message: "missing required name field"
      })
    } else {
      next()
    }
  };
}

function validatePost(req, res, next) {
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
