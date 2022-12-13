import express from 'express';

const router = express.Router();

import { getAboutById, getAboutByUserId, createAbout, updateAbout, deleteAbout } from '../controllers/about';

import protect from '../middleware/authMiddleware';

router.get('/:id', getAboutById);
router.get('/user/:id', getAboutByUserId);

router.post('/', createAbout);

router.put('/:id', updateAbout);

router.delete('/:id', deleteAbout);

module.exports = router;
