import { Request, Response } from 'express';
import {generateToken} from "../middleware/authMiddleware";
const mongoose = require('mongoose');
const db = require('../models');
const Contact = db.contact;
const User = db.user;


const getAll = async (req: Request, res: Response) => {

    await Contact.find({})
      .then((data: JSON) => {
        res.status(200);
        res.send(data);
      })
      .catch((err: JSON) => {
        console.log(err);
        res.status(500).send({
          message: 'Could not get Contacts from database. Please try again later.'
        });
      });

};

const getContact = (req: Request, res: Response) => {

  try {
    const contact_id = mongoose.Types.ObjectId(req.params.contact_id);

    Contact.findOne({ _id: contact_id })
    .then((data: any) => {
      if (data === null) {
        res.status(400).send({ message: 'Could not find contact with id ' + contact_id + ' in the database.' });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err: any) => {
      console.log(err)
      res.status(500).send({
        message: 'Error getting contact from database. Please try again later.'});
    });
  }
  catch {
    res.status(400).send({ message: 'Invalid contact_id. Please try again.' });
  }

};

const insertContact = async (req: Request, res: Response) => {
  try {
    // Validate request
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({ message: 'Fields can not be empty!' });
    return;
  }

  let newContact = new Contact({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });



  // Save newUser
  newContact
  .save()
    .then((data: JSON) => {
      res.status(201).send({data});
    })
    .catch((err: any) => {
      if (err._message === 'contact validation failed') {
        res.status(400).send({ message: err.message });
      } else {
        console.log(err);
        res.status(500).send({ message: 'Could not insert the new contact. Please try again later.' });
      }
    });
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Could not insert the new contact. Please try again later.' });
  }
};


const updateContact = async (req: Request, res: Response) => {

  try {
    const contact_id = req.params.contact_id;
    if (!contact_id) {
      res.status(400).send({ message: 'contact_id field cannot be empty' });
      return;
    }

    try {
      const contact_id = mongoose.Types.ObjectId(req.params.contact_id);

      Contact.findOne({ _id: contact_id })
      .then(async (data: any) => {
        if (data === null) {
          res.status(400).send({ message: 'Could not find contact_id ' + contact_id + ' in the database.' });
        } else {
          const contact = new User(data);

          let updatedUser: { [key: string]: string } = {}

          
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
          message: 'Error getting contact from database. Please try again later.'});
      });
    } catch {
      res.status(400).send({ message: 'Invalid contact_id. Please try again.' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Could not insert the new contact. Please try again later.' });
  }
}

const deleteContact = (req: Request, res: Response) => {

  try {
    const contact_id = mongoose.Types.ObjectId(req.params.user_id);
   Contact.deleteOne({ _id: contact_id })
    .then((data: { [key: string]: any }) => {
      if (data.acknowledged) {
        if (data.deletedCount > 0) {
          res.status(200).send();
        }
        else {
          res.status(400).send({ message: 'Could not find contact_id ' +contact_id + ' in the database.' });
        }
      } else {
        res.status(400).send({ message: 'Could not delete the contact. Not authorized.' });
      }
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({
        message: 'Error deleting user_id ' + contact_id + ' from database. Please try again later.',
      });
    });
  }
  catch {
    res.status(400).send({ message: 'Invalid contact_id. Please try again.' });
  }
};

module.exports = { getAll, getContact, insertContact, updateContact, deleteContact };
