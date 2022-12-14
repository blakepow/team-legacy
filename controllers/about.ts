import {Request, Response} from "express";

import {AboutSchema} from "../models/about";

export const getAboutById = async (req: Request, res: Response) => {
    const id = req.params.about_id;
    const about = await AboutSchema.findById(id);

    if (!about) {
        res.status(404).send( {message: "No about found with that id"} );
        return;
    }

    res.status(200).send(about);
}

export const getAboutByUserId = async (req: Request, res: Response) => {
    const id = req.body.user_id;
    const about = await AboutSchema.findOne({user_id: id});

    if (!about) {
        res.status(404).send( {message: "No about found with that user id"} );
        return;
    }

    res.status(200).send(about);
}

export const createAbout = async (req: Request, res: Response) => {
    const about = new AboutSchema(req.body);
    
    //check if about exists with that user id
    const aboutRef = await AboutSchema.findOne({user_id: req.body.user_id});
    if (aboutRef) {
        res.status(409).send({message: "About already exists with your user id"});
        return;
    }

    try {
        await about.save();
        res.status(201).send(about);
    } catch (e) {
        console.log(about);
        res.status(400).send(e);
    }
}

export const updateAbout = async (req: Request, res: Response) => {
    const id = req.body.user_id;
    const about = await AboutSchema.findOne({user_id: id});

    if (!about) {
        res.status(404).send( {message: "No about found with that user id"} );
        return;
    }

    try {
        await AboutSchema.findByIdAndUpdate(about._id, req.body);
        res.status(200).send( {message: "About updated"} );
    } catch (e) {
        res.status(400).send(e);
    }
}

export const deleteAbout = async (req: Request, res: Response) => {
    const id = req.body.user_id;
    const about = await AboutSchema.findOne({user_id: id});

    if (!about) {
        res.status(404).send( {message: "No about found with that id"} );
        return;
    }

    try {
        about.remove();
        res.status(200).send("About deleted");
    } catch (e) {
        res.status(400).send(e);
    }
}
