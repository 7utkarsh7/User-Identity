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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const ContactService_1 = require("../services/ContactService");
class ContactController {
    constructor() {
        this.identifyContacts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, phoneNumber } = req.body;
                if (!email && !phoneNumber) {
                    res.status(400).json({ error: 'At least one of email or phoneNumber must be provided' });
                }
                const response = yield this.contactService.identifyContacts(email, phoneNumber);
                res.json(response);
            }
            catch (error) {
                console.error('An error occurred:', error);
                res.status(500).json({ error: 'An error occurred' });
            }
        });
        this.contactService = new ContactService_1.ContactService();
    }
}
exports.ContactController = ContactController;
