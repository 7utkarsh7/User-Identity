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
exports.ContactService = void 0;
const ContactRepository_1 = require("./ContactRepository");
class ContactService {
    constructor() {
        this.contactRepository = new ContactRepository_1.ContactRepository();
    }
    identifyContacts(email, phoneNumber) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!email && !phoneNumber) {
                throw new Error("At least one of email or phoneNumber must be provided");
            }
            const isEmailMatched = yield this.contactRepository.findPrimaryContactByEmail(email);
            const isNumberMatched = yield this.contactRepository.findPrimaryContactByPhoneNumber(phoneNumber);
            if (!isEmailMatched && !isNumberMatched) {
                const insertId = yield this.contactRepository.createPrimaryContact(phoneNumber, email);
                const response = yield this.sendResponse(insertId);
                return response;
            }
            else if (isEmailMatched && isNumberMatched) {
                if (isEmailMatched.linkedId === isNumberMatched.linkedId) {
                    const primaryUserId = yield this.contactRepository.findPrimaryUserIdByEmailAndPhoneNumber(email, phoneNumber);
                    const response = yield this.sendResponse(primaryUserId);
                    return response;
                }
                else {
                    yield this.contactRepository.updateLinkedId(isEmailMatched.linkedId, isNumberMatched.linkedId);
                    yield this.contactRepository.updateLinkPrecedence(isNumberMatched.linkedId);
                    const response = yield this.sendResponse(isEmailMatched.linkedId);
                    return response;
                }
            }
            else {
                const linkedId = (_a = ((isEmailMatched === null || isEmailMatched === void 0 ? void 0 : isEmailMatched.id) || (isNumberMatched === null || isNumberMatched === void 0 ? void 0 : isNumberMatched.id))) !== null && _a !== void 0 ? _a : null;
                if (phoneNumber && email) {
                    yield this.contactRepository.createSecondaryContact(phoneNumber, email, linkedId);
                }
                const response = yield this.sendResponse(linkedId);
                return response;
            }
        });
    }
    sendResponse(primaryContactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const primaryContact = yield this.contactRepository.findContactById(primaryContactId);
            const secondaryContacts = yield this.contactRepository.findContactsByLinkedId(primaryContactId);
            const uniqueEmails = new Set();
            const uniquePhoneNumbers = new Set();
            if (primaryContact) {
                uniqueEmails.add(primaryContact.email);
                uniquePhoneNumbers.add(primaryContact.phoneNumber);
            }
            secondaryContacts.forEach((contact) => {
                uniqueEmails.add(contact.email);
                uniquePhoneNumbers.add(contact.phoneNumber);
            });
            return {
                contact: {
                    primaryContactId: primaryContact ? primaryContact.id : null,
                    emails: Array.from(uniqueEmails).filter((element) => element !== null),
                    phoneNumbers: Array.from(uniquePhoneNumbers).filter((element) => element !== null),
                    secondaryContactIds: secondaryContacts.map((contact) => contact.id),
                },
            };
        });
    }
}
exports.ContactService = ContactService;
