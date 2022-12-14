import express from 'express';
const router = express.Router();

import { getContact, insertContact, updateContact, deleteContact } from '../controllers/contact';

import protect from '../middleware/authMiddleware';

router.get('/',protect, getContact);

router.post('/', protect, insertContact);

router.put('/', protect, updateContact);

router.delete('/', protect, deleteContact);

module.exports = router;
