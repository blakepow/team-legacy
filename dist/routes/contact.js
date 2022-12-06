"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var contactsController = require('../controllers/user');
router.get('/', contactsController.getContacts);
router.post('/', contactsController.insertContact);
router.get('/:user_id', contactsController.getContact);
router.put('/:user_id', contactsController.updateContact);
router.delete('/:user_id', contactsController.deleteContact);
module.exports = router;
