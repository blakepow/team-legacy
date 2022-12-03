import express from 'express';
const router = express.Router();

const usersController = require('../controllers/user');

router.get('/', usersController.getAll);
router.post('/', usersController.insertUser);

router.get('/:user_id', usersController.getSingle);
router.put('/:user_id', usersController.updateUser);
router.delete('/:user_id', usersController.deleteUser);

module.exports = router;