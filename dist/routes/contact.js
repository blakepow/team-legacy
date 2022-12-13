"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var contactsController = require('../controllers/contact');
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
//router.post('/', protect, contactsController.insertContact);
router.get('/', authMiddleware_1.default, contactsController.getContact);
router.put('/', authMiddleware_1.default, contactsController.updateContact);
//router.delete('/', protect, contactsController.deleteContact);
module.exports = router;
