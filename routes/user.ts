import express from 'express';
const router = express.Router();

const usersController = require('../controllers/user');

import protect from '../middleware/authMiddleware';

router.get('/all', protect, usersController.getAll);
router.post('/', usersController.insertUser);
router.post('/login', usersController.userLogin);

router.get('/', protect, usersController.getSingle);
router.put('/', protect, usersController.updateUser);
router.delete('/', protect, usersController.deleteUser);

module.exports = router;
