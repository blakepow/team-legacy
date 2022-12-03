import express from 'express';
const router = express.Router();

const usersController = require('../controllers/user');

router.get('/', usersController.getAll);
router.get('/:user_id', usersController.getSingle);

module.exports = router;