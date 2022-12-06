import express from 'express';
const router = express.Router();

const contactsController = require('../controllers/user');

import protect from '../middleware/authMiddleware';

router.get('/', contactsController.getContacts);
router.post('/', contactsController.insertContact);


router.get('/:user_id', contactsController.getContact);
router.put('/:user_id', contactsController.updateContact);
router.delete('/:user_id', contactsController.deleteContact);

module.exports = router;
