import express from 'express';
const router = express.Router();

const projectsController = require('../controllers/projects');

import protect from '../middleware/authMiddleware';

router.get('/', protect, projectsController.getAll);
router.post('/', protect, projectsController.insertProject);

module.exports = router;
