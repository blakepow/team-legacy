"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var contact_1 = require("../controllers/contact");
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.get('/', authMiddleware_1.default, contact_1.getContact);
router.post('/', authMiddleware_1.default, contact_1.insertContact);
router.put('/', authMiddleware_1.default, contact_1.updateContact);
router.delete('/', authMiddleware_1.default, contact_1.deleteContact);
module.exports = router;
