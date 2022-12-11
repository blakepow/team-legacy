import express from 'express';
const router = express.Router();

const projectsController = require('../controllers/projects');

import protect from '../middleware/authMiddleware';

router.get('/', protect, projectsController.getAll);
router.post('/', protect, projectsController.insertProject);

router.put('/:project_id', protect, projectsController.updateProject);
router.delete('/:project_id', protect, projectsController.deleteProject);

module.exports = router;
