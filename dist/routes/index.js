"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var mainController = require('../controllers');
router.get('/', mainController.getMain);
router.use('/user', require('./user'));
router.use('/contact', require('./contact'));
router.use('/projects', require('./projects'));
router.use('/about', require('./about'));
module.exports = router;
