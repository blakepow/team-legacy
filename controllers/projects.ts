import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ProjectSchema } from "../models/projects";

export const getAll = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
    return;
  }

  try {
    const projects = await ProjectSchema.find( {user_id: user_id} );
  
    if (!projects) {
      res.status(404).send( {message: "No projects found under current user"} );
      return;
    }
    res.status(200).send(projects);

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Could not get projects from database. Please try again later.'} );
  }
}

export const insertProject = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
    return;
  }
  
  // Validate request
  if (!req.body.title || !req.body.description || !req.body.url || !req.body.date || !req.body.skills || !req.body.languages || !req.body.contributors) {
    res.status(400).send({ message: 'Fields can not be empty!' });
    return;
  }

  const project = new ProjectSchema(req.body);
  try {
    await project.save();
    res.status(201).send(project);
  } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Could not insert the new project. Please try again later.' });
  }
}

export const updateProject = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
    return;
  }

  let project_id
  try {
    project_id = new mongoose.Types.ObjectId(req.params.project_id);
  } catch (error) {
    res.status(400).send({ message: 'Invalid project_id. Please try again later.' });
    return;
  }

  const project = await ProjectSchema.findById(project_id);

  if (!project) {
    res.status(404).send( {message: "No project found with that project_id"} );
    return;
  }

  try {
    await ProjectSchema.findByIdAndUpdate(project._id, req.body);
    res.status(204).send();
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Could not update the project. Please try again later.' });
  }
  
}

export const deleteProject = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
    return;
  }

  let project_id
  try {
    project_id = new mongoose.Types.ObjectId(req.params.project_id);
  } catch (error) {
    res.status(400).send({ message: 'Invalid project_id. Please try again later.' });
    return;
  }

  const project = await ProjectSchema.findById(project_id);

  if (!project) {
    res.status(404).send( {message: "No project found with that project_id"} );
    return;
  }

  try {
    project.remove();
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error deleting project ' + project_id + ' from database. Please try again later.'});
  }
}