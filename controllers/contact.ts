import { Request, Response } from 'express';
const mongoose = require('mongoose');
const db = require('../models');
const Contact = db.contacts;

const getAll = async (req: Request, res: Response) => {
  const user_id = mongoose.Types.ObjectId(req.params.user_id);

    await Contact.find({user_id: user_id }).select('-user_id')
      .then((data: JSON) => {
        res.status(200);
        res.send(data);
      })
      .catch((err: JSON) => {
        console.log(err);
        res.status(500).send({
          message: 'Could not get contact details from database. Please try again later.'
        });
      });
};

const insertContact = async (req: Request, res: Response) => {
  try {
    // Validate request
  if (!req.body.houseNumber || !req.body.streetName || !req.body.cityName || !req.body.countryName || !req.body.countryCode || !req.body.telephoneNumber) {
    res.status(400).send({ message: 'Fields can not be empty!' });
    return;
  }

  let newContact = new Contact({
    user_id: req.params.user_id,
    houseNumber: req.body.houseNumber,
    streetName: req.body.streetName,
    cityName: req.body.cityName,
    countryName: req.body.countryName,
    countryCode: req.body.countryCod,
    telephoneNumber: req.body.telephoneNumber,
  });

  // Save newContact
  newContact
  .save()
    .then((data: JSON) => {
      res.status(201).send({data});
    })
    .catch((err: any) => {
        console.log(err);
        res.status(500).send({ message: 'Could not add contact details. Please try again later.' });
    });
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Could not add contact details. Please try again later.' });
  }
};

const updateContact = async (req: Request, res: Response) => {

  if (!req.params.contact_id) {
    res.status(400).send({ message: 'You must provide a contact_id' });
    return;
  }
  
  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
      return;
    }

    try {
      const contact_id = mongoose.Types.ObjectId(req.params.contact_id);

      contact.findOne({ _id: contact_id, user_id: user_id })
      .then(async (data: any) => {
        if (data === null) {
          res.status(400).send({ message: 'Could not find contact_id ' + contact_id + ' in the database.' });
        } else {

          let updatedContact: { [key: string]: string } = {}

          if (req.body.houseNumber) {
            updatedContact.title = req.body.houseNumber;
          }

          if (req.body.streetName) {
            updatedContact.description = req.body.streetName;
          }

          if (req.body.cityName) {
            updatedContact.url = req.body.cityName;
          }

          if (req.body.countryName) {
            updatedContact.title = req.body.countryName;
          }

          if (req.body.countryCode) {
            updatedContact.skills = req.body.countryCode;
          }

          if (req.body.telephoneNumber) {
            updatedContact.languages = req.body.telephoneNumber;
          }
          
          Object.assign(data, updatedContact);
          data.save()
          .then((data: JSON) => {
            res.status(204).send();
          })
          .catch((err: any) => {
              console.log(err);
              res.status(500).send({ message: 'Could not update contact deatils. Please try again later.' });
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).send({
          message: 'Error getting contact details from database. Please try again later.'});
      });
    } catch {
      res.status(400).send({ message: 'Invalid contact_id. Please try again.' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Could not update contact details. Please try again later.' });
  }
}

const deleteContact = (req: Request, res: Response) => {

  if (!req.params.contact_id) {
    res.status(400).send({ message: 'You must provide a contact_id' });
    return;
  }

  try {
    const contact_id = mongoose.Types.ObjectId(req.params.contact_id);
    Contact.deleteOne({ _id: contact_id })
    .then((data: { [key: string]: any }) => {
      if (data.acknowledged) {
        if (data.deletedCount > 0) {
          res.status(200).send();
        }
        else {
          res.status(400).send({ message: 'Could not find contact_id ' + contact_id + ' in the database.' });
        }
      } else {
        res.status(400).send({ message: 'Could not delete the user. Not authorized.' });
      }
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({
        message: 'Error deleting contact details ' + contact_id + ' from database. Please try again later.',
      });
    });
  }
  catch {
    res.status(400).send({ message: 'Invalid contact_id. Please try again.' });
  }
};

module.exports = { getAll, insertContact, updateContact, deleteContact };
