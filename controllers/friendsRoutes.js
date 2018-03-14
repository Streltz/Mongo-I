const express = require('express');
const friendsRouter = express.Router();
const Friend = require('../models/schema.js');

const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_SEVER_ERROR = 500;
const STATUS_CREATED_SUCCESS = 201;
const STATUS_OK = 200;

friendsRouter.post('/friends', (req, res) => {
  if (req.body.firstName && req.body.lastName && req.body.age) {
    const friend = new Friend(req.body);
    friend
      .save()
      .then((savedFriend) => {
        res.status(STATUS_CREATED_SUCCESS).json(savedFriend);
      })
      .catch((err) => {
        res.status(STATUS_SEVER_ERROR).send({
          error: 'There was an error while saving your Friend to the Database',
        });
      });
  } else {
    res.status(STATUS_BAD_REQUEST).json({
      errorMessage: 'Please provide ALL the requested Friend data.',
    });
  }
});
friendsRouter.get('/friends', (req, res) => {
  Friend.find({})
    .then((friends) => {
      res.status(STATUS_OK).json(friends);
    })
    .catch((err) => {
      res
        .status(STATUS_SEVER_ERROR)
        .json({ error: 'The information could not be retrieved.' });
    });
});
friendsRouter.get('/friends/:id', (req, res) => {
  // if (mongoose.Types.ObjectId.isValid(req.params.id)) {
  Friend.findById(req.params.id)
    .then((id) => {
      console.log(id);
      if (id === null) {
        res.status(STATUS_NOT_FOUND).json({
          message: 'The Friend with the specified ID does not exist.',
        });
      } else {
        res.status(STATUS_OK).json(id);
      }
    })
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          return res
            .status(STATUS_SEVER_ERROR)
            .json({ error: 'The information could not be retrieved.' });
        default:
          res.status(STATUS_SEVER_ERROR).json({ error: err.name });
      }
    });
  // }
});

friendsRouter.delete('/friends/:id', (req, res) => {
  Friend.findByIdAndRemove(req.params.id)
    .then((id) => {
      res
        .status(STATUS_OK)
        .json({ success: `Bad Panda, ${req.params.id},  deleted` });
    })
    .catch((err) => {
      res
        .status(STATUS_NOT_FOUND)
        .json({ message: 'The Friend with the specified ID does not exist.' });
    });
});
friendsRouter.put('/friends/:id', (req, res) => {
  Friend.findByIdAndUpdate(req.params.id, req.body)
    .then((friend) => {
      if (friend === null) {
        res
          .status(STATUS_NOT_FOUND)
          .json({ message: 'The Friend with the specified ID does not exist.' });
      } else {
        res
          .status(STATUS_OK)
          .json({ success: `Friend, ${req.params.id} Updated` });
      }
    })
    .catch((err) => {
      console.log(err)
      switch (err.name) {
        default:
          res
            .status(STATUS_SEVER_ERROR)
            .json({ error: 'The Friend information could not be modified.' });
      }
    });
});

module.exports = friendsRouter;