

import {Request, Response, NextFunction} from 'express'

import jwt, {JwtPayload} from 'jsonwebtoken'

const db = require('../models');
const User = db.user;


const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

            // Get user from the token
            req.params.user_id = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error);
            res.status(401).send({message: 'Not authorized, token failed'})
        }
    }

    if(!token) {
        res.status(401).send({message: 'Not authorized, no token'})
        return
    }
}

export const generateToken = (id: {}) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '1d'
    })
}

export default protect
