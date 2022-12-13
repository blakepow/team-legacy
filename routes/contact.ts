import express from 'express';
const router = express.Router();

const contactsController = require('../controllers/contact');

import protect from '../middleware/authMiddleware';

router.post('/', protect, contactsController.insertContact);
router.get('/:user_id',protect, contactsController.getContact);
router.put('/:user_id', protect, contactsController.updateContact);
router.delete('/:user_id, protect, contactsController.deleteContact
module.exports = router;
