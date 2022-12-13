import { Request, Response } from 'express';
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
  if (!req.body.title || !req.body.description || !req.body.url || !req.body.date || !req.body.skills || !req.body.languages || !req.body.contributors) {
    res.status(400).send({ message: 'Fields can not be empty!' });
    return;
  }

  let newProject = new Projects({
    user_id: req.params.user_id,
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    date: req.body.date,
    skills: req.body.skills,
    languages: req.body.languages,
    contributors: req.body.contributors
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

const updateProject = async (req: Request, res: Response) => {

  if (!req.params.project_id) {
    res.status(400).send({ message: 'You must provide a project_id' });
    return;
  }
  
  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
      return;
    }

    try {
      const project_id = mongoose.Types.ObjectId(req.params.project_id);

      Projects.findOne({ _id: project_id, user_id: user_id })
      .then(async (data: any) => {
        if (data === null) {
          res.status(400).send({ message: 'Could not find project_id ' + project_id + ' in the database.' });
        } else {

          let updatedProject: { [key: string]: string } = {}

          if (req.body.title) {
            updatedProject.title = req.body.title;
          }

          if (req.body.description) {
            updatedProject.description = req.body.description;
          }

          if (req.body.url) {
            updatedProject.url = req.body.url;
          }

          if (req.body.date) {
            updatedProject.title = req.body.date;
          }

          if (req.body.skills) {
            updatedProject.skills = req.body.skills;
          }

          if (req.body.languages) {
            updatedProject.languages = req.body.languages;
          }

          if (req.body.contributors) {
            updatedProject.contributors = req.body.contributors;
          }

          Object.assign(data, updatedProject);
          data.save()
          .then((data: JSON) => {
            res.status(204).send();
          })
          .catch((err: any) => {
              console.log(err);
              res.status(500).send({ message: 'Could not update the project. Please try again later.' });
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).send({
          message: 'Error getting project from database. Please try again later.'});
      });
    } catch {
      res.status(400).send({ message: 'Invalid project_id. Please try again.' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Could not update the project. Please try again later.' });
  }
}

const deleteProject = (req: Request, res: Response) => {

  if (!req.params.project_id) {
    res.status(400).send({ message: 'You must provide a project_id' });
    return;
  }

  try {
    const project_id = mongoose.Types.ObjectId(req.params.project_id);
    Projects.deleteOne({ _id: project_id })
    .then((data: { [key: string]: any }) => {
      if (data.acknowledged) {
        if (data.deletedCount > 0) {
          res.status(200).send();
        }
        else {
          res.status(400).send({ message: 'Could not find project_id ' + project_id + ' in the database.' });
        }
      } else {
        res.status(400).send({ message: 'Could not delete the user. Not authorized.' });
      }
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({
        message: 'Error deleting project ' + project_id + ' from database. Please try again later.',
      });
    });
  }
  catch {
    res.status(400).send({ message: 'Invalid project_id. Please try again.' });
  }
};

module.exports = { getAll, insertProject, updateProject, deleteProject };
