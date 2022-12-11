"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var projectsController = require('../controllers/projects');
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.get('/', authMiddleware_1.default, projectsController.getAll);
router.post('/', authMiddleware_1.default, projectsController.insertProject);
module.exports = router;
