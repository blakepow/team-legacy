"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getMain = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ "title": "Team Legacy", "message": "Welcome our Personal Portfolio API", "documentation": { "production": "https://team-legacy-api.onrender.com/api-docs/", "sandbox": "http://localhost:3030/api-docs/" } });
};
module.exports = { getMain: getMain };
