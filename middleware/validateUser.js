// validateUserId() validates the user id on every request that expects a user id parameter
// if the id parameter is valid, store that user object as req.user
// if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }

const users = require('../users/userDb');

function validateUserId() {
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
};

// validateUser() validates the body on a request to create a new user
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
// if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }

function validateUser() {
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
};

module.exports = {
  validateUserId,
  validateUser
};