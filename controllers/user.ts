import { Request, Response } from 'express';
const mongoose = require('mongoose');
const db = require('../models');
const User = db.user;

const getAll = (req: Request, res: Response) => {

    User.find({})
      .then((data: JSON) => {
        res.status(200);
        res.send(data);
      })
      .catch((err: JSON) => {
        console.log(err);
        res.status(500).send({
          message: 'Could not get users from database. Please try again later.'
        });
      });
      
};

const getSingle = (req: Request, res: Response) => {

  try {
    const user_id = mongoose.Types.ObjectId(req.params.user_id);

    User.findOne({ _id: user_id })
    .then((data: Array<Object>) => {
      if (data === null || data.length == 0) {
        res.status(400).send({ message: 'Could not find user with id ' + user_id + ' in the database.' });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err: JSON) => {
      console.log(err)
      res.status(500).send({
        message: 'Error getting user from database. Please try again later.'});
    });
  }
  catch (e) {
    res.status(400).send({ message: 'Invalid user_id. Please try again.' });
  }
  
};

module.exports = { getAll, getSingle };