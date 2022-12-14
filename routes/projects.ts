import express from 'express';
const router = express.Router();

import { getAll, insertProject, updateProject, deleteProject } from '../controllers/projects';

import protect from '../middleware/authMiddleware';

router.get('/', protect, getAll);
router.post('/', protect, insertProject);

router.put('/:project_id', protect, updateProject);
router.delete('/:project_id', protect, deleteProject);

module.exports = router;
