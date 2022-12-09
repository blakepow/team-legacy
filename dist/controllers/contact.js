"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var db = require('../models');
var Contact = db.contact;
var getContact = '/models/user/:id';
{
    try {
        db.Product.findOne({ _id: req, equest: equest, : .params.id })
            .then(function (data) {
            if (data === null) {
                res.status(400).send({ message: "Could not find contact details of user with id ".concat(contact_id, " in the database.") });
            }
            else {
                res.status(200).send(data);
            }
        })
            .catch(function (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error getting user contact details from database. Please try again later.'
            });
        });
    }
    catch (_a) {
        res.status(400).send({ message: 'Invalid user_id. Please try again.' });
    }
}
;
var updateContact = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, user_id_1;
    return __generator(this, function (_a) {
        try {
            user_id = req.params.user_id;
            if (!user_id) {
                res.status(400).send({ message: 'user_id field cannot be empty' });
                return [2 /*return*/];
            }
            try {
                user_id_1 = mongoose.Types.ObjectId(req.params.user_id);
                Contact.findOne({ _id: user_id_1 })
                    .then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var contact, updatedContact;
                    return __generator(this, function (_a) {
                        if (data === null) {
                            res.status(400).send({ message: "Could not find user_id ".concat(user_id_1, "  in the database.") });
                        }
                        else {
                            contact = new Contact(data);
                            updatedContact = {};
                            Object.assign(data, updatedContact);
                            data.save()
                                .then(function (data) {
                                res.status(204).send();
                            })
                                .catch(function (err) {
                                if (err._message === 'user validation failed') {
                                    res.status(400).send({ message: err.message });
                                }
                                else {
                                    console.log(err);
                                    res.status(500).send({ message: 'Could not update the user contact details. Please try again later.' });
                                }
                            });
                        }
                        return [2 /*return*/];
                    });
                }); })
                    .catch(function (err) {
                    console.log(err);
                    res.status(500).send({
                        message: 'Error getting user contact details from database. Please try again later.'
                    });
                });
            }
            catch (_b) {
                res.status(400).send({ message: 'Invalid user_id. Please try again.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Could not insert user contact details. Please try again later.' });
        }
        return [2 /*return*/];
    });
}); };
module.exports = { getContact: getContact, updateContact: updateContact };
