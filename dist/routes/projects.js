"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var projects_1 = require("../controllers/projects");
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.get('/', authMiddleware_1.default, projects_1.getAll);
router.post('/', authMiddleware_1.default, projects_1.insertProject);
router.put('/:project_id', authMiddleware_1.default, projects_1.updateProject);
router.delete('/:project_id', authMiddleware_1.default, projects_1.deleteProject);
module.exports = router;
