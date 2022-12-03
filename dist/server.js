"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var swaggerUi = require("swagger-ui-express");
var fs = require("fs");
/* Swagger files start */
var swaggerFile = (process.cwd() + "/swagger/swagger.json");
var swaggerData = fs.readFileSync(swaggerFile, 'utf8');
var swaggerDocument = JSON.parse(swaggerData);
var port = process.env.PORT || 3030;
var app = (0, express_1.default)();
app
    .use(body_parser_1.default.json())
    .use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes'));
process.on('uncaughtException', function (err, origin) {
    console.log(process.stderr.fd, "Caught exception: ".concat(err, "\n") + "Exception origin: ".concat(origin));
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
