import { Request, Response } from 'express';
import {generateToken} from "../middleware/authMiddleware";
const mongoose = require('mongoose');
const db = require('../models');
const Projects = db.projects;

const getAll = async (req: Request, res: Response) => {
  const user_id = mongoose.Types.ObjectId(req.params.user_id);

    await Projects.find({user_id: user_id }).select('-user_id')
      .then((data: JSON) => {
        res.status(200);
        res.send(data);
      })
      .catch((err: JSON) => {
        console.log(err);
        res.status(500).send({
          message: 'Could not get projects from database. Please try again later.'
        });
      });

};

const insertProject = async (req: Request, res: Response) => {
  try {
    // Validate request
  if (!req.body.title || !req.body.description) {
    res.status(400).send({ message: 'Fields can not be empty!' });
    return;
  }

  let newProject = new Projects({
    user_id: req.params.user_id,
    title: req.body.title,
    description: req.body.description
  });

  // Save newProject
  newProject
  .save()
    .then((data: JSON) => {
      res.status(201).send({data});
    })
    .catch((err: any) => {
        console.log(err);
        res.status(500).send({ message: 'Could not insert the new project. Please try again later.' });
    });
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Could not insert the new project. Please try again later.' });
  }
};


module.exports = { getAll, insertProject };
