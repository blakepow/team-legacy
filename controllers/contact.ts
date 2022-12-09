import { Request, Response } from 'express';
import {generateToken} from "../middleware/authMiddleware";
const mongoose = require('mongoose');
const db = require('../models');
const Contact = db.contact;


const getContact = '/models/user/:id', function(req: Request, res:Response) => {
  try {
    db.Product.findOne({ _id: req: equest.params.id })
    .then((data: any) => {
      if (data === null) {
        res.status(400).send({ message: `Could not find contact details of user with id ${contact_id} in the database.` });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err: any) => {
      console.log(err)
      res.status(500).send({
        message: 'Error getting user contact details from database. Please try again later.'});
    });
  }
  catch {
    res.status(400).send({ message: 'Invalid user_id. Please try again.' });
  }

};




const updateContact = async (req: Request, res: Response) => {

  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      res.status(400).send({ message: 'user_id field cannot be empty' });
      return;
    }

    try {
      const user_id = mongoose.Types.ObjectId(req.params.user_id);

      Contact.findOne({ _id: user_id })
      .then(async (data: any) => {
        if (data === null) {
          res.status(400).send({ message: `Could not find user_id ${user_id}  in the database.` });
        } else {
          const contact = new Contact(data);

          let updatedContact: { [key: string]: string } = {} 

          Object.assign(data, updatedContact);
          data.save()
          .then((data: JSON) => {
            res.status(204).send();
          })
          .catch((err: any) => {
            if (err._message === 'user validation failed') {
              res.status(400).send({ message: err.message });
            } else {
              console.log(err);
              res.status(500).send({ message: 'Could not update the user contact details. Please try again later.' });
            }
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).send({
          message: 'Error getting user contact details from database. Please try again later.'});
      });
    } catch {
      res.status(400).send({ message: 'Invalid user_id. Please try again.' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Could not insert user contact details. Please try again later.' });
  }
}



module.exports = {  getContact, updateContact};
