import express from 'express';

const router = express.Router();

import { getAboutById, getAboutByUserId, createAbout, updateAbout, deleteAbout } from '../controllers/about';

import protect from '../middleware/authMiddleware';

router.get('/:about_id', protect, getAboutById);
router.get('/', protect, getAboutByUserId);

router.post('/', protect, createAbout);

router.put('/', protect, updateAbout);

router.delete('/', protect, deleteAbout);

module.exports = router;
