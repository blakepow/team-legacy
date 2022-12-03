import express from 'express';
const router = express.Router();

const mainController = require('../controllers');
router.get('/', mainController.getMain);

router.use('/user', require('./user'));

module.exports = router;
