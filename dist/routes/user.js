"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var usersController = require('../controllers/user');
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.get('/all', authMiddleware_1.default, usersController.getAll);
router.post('/', usersController.insertUser);
router.post('/login', usersController.userLogin);
router.get('/', authMiddleware_1.default, usersController.getSingle);
router.put('/', authMiddleware_1.default, usersController.updateUser);
router.delete('/', authMiddleware_1.default, usersController.deleteUser);
module.exports = router;
