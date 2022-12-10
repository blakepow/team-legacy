import { Request, Response } from 'express';
import {generateToken} from "../middleware/authMiddleware";
const mongoose = require('mongoose');
const db = require('../models');
const User = db.contact;



const updateUser = async (req: Request, res: Response) => {

  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      res.status(400).send({ message: 'user_id field cannot be empty' });
      return;
    }

    try {
      const user_id = mongoose.Types.ObjectId(req.params.user_id);

      User.findOne({ _id: user_id })
      .then(async (data: any) => {
        if (data === null) {
          res.status(400).send({ message: 'Could not find user_id ' + user_id + ' in the database.' });
        } else {
          const user = new User(data);

          let updatedUser: { [key: string]: string } = {}

          if (req.body.password) {
            const valid = await user.validatePassword(req.body.password);
            if (valid) {
              res.status(400).send({ message: 'New password cannot be the same as the old password.' });
              return;
            }
            updatedUser.password = req.body.password;
          }

          if (req.body.email && req.body.email !== user.email) updatedUser.email = req.body.email;

          if (req.body.username && req.body.username !== user.username) updatedUser.username = req.body.username;

          Object.assign(data, updatedUser);
          data.save()
          .then((data: JSON) => {
            res.status(204).send();
          })
          .catch((err: any) => {
            if (err._message === 'user validation failed') {
              res.status(400).send({ message: err.message });
            } else {
              console.log(err);
              res.status(500).send({ message: 'Could not update the user. Please try again later.' });
            }
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).send({
          message: 'Error getting user from database. Please try again later.'});
      });
    } catch {
      res.status(400).send({ message: 'Invalid user_id. Please try again.' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Could not insert the new user. Please try again later.' });
  }
}



module.exports = { updateUser };
