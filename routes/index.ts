import express from 'express';
const router = express.Router();

const mainController = require('../controllers');
router.get('/', mainController.getMain);

router.use('/user', require('./user'));
router.use('/contact', require('./contact'))

module.exports = router;
