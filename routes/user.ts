import express from 'express';
const router = express.Router();

const usersController = require('../controllers/user');

import protect from '../middleware/authMiddleware';

router.get('/', usersController.getAll);
router.post('/', usersController.insertUser);
router.post('/login', usersController.userLogin);

router.get('/:user_id', usersController.getSingle);
router.put('/:user_id', usersController.updateUser);
router.delete('/:user_id', usersController.deleteUser);

module.exports = router;
