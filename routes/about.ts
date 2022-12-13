import express from 'express';

const router = express.Router();

import { getAboutById, getAboutByUserId, createAbout, updateAbout, deleteAbout } from '../controllers/about';

import protect from '../middleware/authMiddleware';

router.get('/:id', protect, getAboutById);
router.get('/user/:id', protect, getAboutByUserId);

router.post('/', protect, createAbout);

router.put('/:id', protect, updateAbout);

router.delete('/:id', protect, deleteAbout);

module.exports = router;
