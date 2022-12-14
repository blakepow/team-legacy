import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ProjectSchema } from "../models/projects";

function isValidDate(dateString: string)
{
    // First check for the pattern
    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

    if(!regex_date.test(dateString))
    {
        return false;
    }

    // Parse the date parts to integers
    var parts   = dateString.split("-");
    var day     = parseInt(parts[2], 10);
    var month   = parseInt(parts[1], 10);
    var year    = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
    {
        return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

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

  if (!isValidDate(req.body.date)) {
    res.status(400).send( {message: "Invalid date. Format should be: yyyy-mm-dd."} );
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

  if (!isValidDate(req.body.date)) {
    res.status(400).send( {message: "Invalid date. Format should be: yyyy-mm-dd."} );
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