import express from 'express';
const router = express.Router();

const contactsController = require('../controllers/contact');


router.get('/:user_id', contactsController.getContact);
router.put('/:user_id', contactsController.updateContact);

module.exports = router;
