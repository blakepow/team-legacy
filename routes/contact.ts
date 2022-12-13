import express from 'express';
const router = express.Router();

const contactsController = require('../controllers/contact');

import protect from '../middleware/authMiddleware';

//router.post('/', protect, contactsController.insertContact);
router.get('/',protect, contactsController.getContact);
router.put('/', protect, contactsController.updateContact);
//router.delete('/', protect, contactsController.deleteContact);
module.exports = router;
