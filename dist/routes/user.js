"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var usersController = require('../controllers/user');
router.get('/', usersController.getAll);
router.post('/', usersController.insertUser);
router.post('/login', usersController.userLogin);
router.get('/:user_id', usersController.getSingle);
router.put('/:user_id', usersController.updateUser);
router.delete('/:user_id', usersController.deleteUser);
module.exports = router;
