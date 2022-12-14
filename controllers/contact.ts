import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ContactSchema } from "../models/contact";

export const getContact = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
    return;
  }

  try {
    const contact = await ContactSchema.findOne( {user_id: user_id} );

    if (!contact) {
      res.status(404).send( {message: "No contact information found under current user"} );
      return;
    }
    res.status(200).send(contact);

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Could not get contact information from database. Please try again later.'} );
  }
};

export const insertContact = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
    return;
  }

  //check if about exists with that user id
  const contactRef = await ContactSchema.findOne({user_id: user_id});
  if (contactRef) {
      res.status(409).send({message: "Contact information already exists with your user id"});
      return;
  }

  // Validate request
  if (!req.body.houseNumber || !req.body.streetName || !req.body.cityName || !req.body.countryName || !req.body.countryCode || !req.body.telephoneNumber) {
    res.status(400).send({ message: 'Fields can not be empty!' });
    return;
  }

  const contact = new ContactSchema(req.body);
  try {
    await contact.save();
    res.status(201).send(contact);
  } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Could not insert contact information. Please try again later.' });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
    return;
  }

  const contact = await ContactSchema.findOne({user_id: user_id});

  if (!contact) {
    res.status(404).send( {message: "No contact found associated with your account"} );
    return;
  }

  try {
    await ContactSchema.findByIdAndUpdate(contact._id, req.body);
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Could not update contact information. Please try again later.' });
  }

}

export const deleteContact = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
    return;
  }

  const contact = await ContactSchema.findOne({user_id: user_id});

  if (!contact) {
    res.status(404).send( {message: "No contact found associated with your account"} );
    return;
  }

  try {
    contact.remove();
      res.status(200).send("Contact deleted");
  } catch (e) {
      res.status(400).send(e);
  }
  
};
