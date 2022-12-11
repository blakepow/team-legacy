import { Request, Response } from 'express';
import {generateToken} from "../middleware/authMiddleware";
const mongoose = require('mongoose');
const db = require('../models');
const User = db.user;
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const getAll = async (req: Request, res: Response) => {

    await User.find({}).select('-password')
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

    User.findOne({ _id: user_id }).select('-password')
    .then((data: any) => {
      if (data === null) {
        res.status(400).send({ message: 'Could not find user with id ' + user_id + ' in the database.' });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err: any) => {
      console.log(err)
      res.status(500).send({
        message: 'Error getting user from database. Please try again later.'});
    });
  }
  catch {
    res.status(400).send({ message: 'Invalid user_id. Please try again.' });
  }

};

const insertUser = async (req: Request, res: Response) => {
  try {
    // Validate request
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({ message: 'Fields can not be empty!' });
    return;
  }

  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  const token = generateToken(newUser);

  // Validate password
  const passwordValidation = newUser.isValidPassword(req.body.password);
  if (passwordValidation.length > 0) {
    res.status(400).send({ message: 'Invalid password:', details: passwordValidation });
    return;
  }

  // Hash password
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    newUser.password = await bcrypt.hash(newUser.password, salt);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Could not insert the new user. Please try again later.' });
    return;
  }

  // Save newUser
  newUser
  .save()
    .then((data: JSON) => {
      res.status(201).send({data, token});
    })
    .catch((err: any) => {
      if (err._message === 'user validation failed') {
        res.status(400).send({ message: err.message });
      } else {
        console.log(err);
        res.status(500).send({ message: 'Could not insert the new user. Please try again later.' });
      }
    });
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Could not insert the new user. Please try again later.' });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ message: 'Fields can not be empty!' });
      return;
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      user.password = '';
      res.status(200).send({ user, token });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Could not login the new user. Please try again later.' });
  }

}

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

const deleteUser = (req: Request, res: Response) => {

  try {
    const user_id = mongoose.Types.ObjectId(req.params.user_id);
    User.deleteOne({ _id: user_id })
    .then((data: { [key: string]: any }) => {
      if (data.acknowledged) {
        if (data.deletedCount > 0) {
          res.status(200).send();
        }
        else {
          res.status(400).send({ message: 'Could not find user_id ' + user_id + ' in the database.' });
        }
      } else {
        res.status(400).send({ message: 'Could not delete the user. Not authorized.' });
      }
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({
        message: 'Error deleting user_id ' + user_id + ' from database. Please try again later.',
      });
    });
  }
  catch {
    res.status(400).send({ message: 'Invalid user_id. Please try again.' });
  }
};

module.exports = { getAll, getSingle, insertUser, userLogin, updateUser, deleteUser };
