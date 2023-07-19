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
exports.ContactRepository = void 0;
const DatabaseUtils_1 = require("./DatabaseUtils");
class ContactRepository {
    findPrimaryContactByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT CASE WHEN linkedId IS NULL THEN id ELSE linkedId END AS linkedId FROM Contact WHERE email = ? LIMIT 1';
            const values = [email];
            const results = yield (0, DatabaseUtils_1.executeQuery)(query, values);
            return results.length > 0 ? results[0] : null;
        });
    }
    findPrimaryContactByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT CASE WHEN linkedId IS NULL THEN id ELSE linkedId END AS linkedId FROM Contact WHERE phoneNumber = ? LIMIT 1';
            const values = [phoneNumber];
            const results = yield (0, DatabaseUtils_1.executeQuery)(query, values);
            return results.length > 0 ? results[0] : null;
        });
    }
    findPrimaryUserIdByEmailAndPhoneNumber(email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT id FROM Contact WHERE email = ? AND phoneNumber = ?';
            const values = [email, phoneNumber];
            const results = yield (0, DatabaseUtils_1.executeQuery)(query, values);
            return results.length > 0 ? results[0].id : null;
        });
    }
    updateLinkedId(emailMatchedId, numberMatchedId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE Contact SET linkedId = ? WHERE id = ? OR linkedId = ?';
            const values = [emailMatchedId, numberMatchedId, numberMatchedId];
            yield (0, DatabaseUtils_1.executeQuery)(query, values);
        });
    }
    updateLinkPrecedence(primaryContactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE Contact SET linkPrecedence = "secondary" WHERE id = ?';
            const values = [primaryContactId];
            yield (0, DatabaseUtils_1.executeQuery)(query, values);
        });
    }
    createPrimaryContact(phoneNumber, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO Contact (phoneNumber, email, linkPrecedence, createdAt, updatedAt) VALUES (?, ?, "primary", NOW(), NOW())';
            const values = [phoneNumber, email];
            const results = yield (0, DatabaseUtils_1.executeQuery)(query, values);
            return results.insertId;
        });
    }
    createSecondaryContact(phoneNumber, email, linkedId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO Contact (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt) VALUES (?, ?, ?, "secondary", NOW(), NOW())';
            const values = [phoneNumber, email, linkedId];
            const results = yield (0, DatabaseUtils_1.executeQuery)(query, values);
            return results.insertId;
        });
    }
    findContactById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Contact WHERE id = ? LIMIT 1';
            const values = [id];
            const results = yield (0, DatabaseUtils_1.executeQuery)(query, values);
            return results.length > 0 ? results[0] : null;
        });
    }
    findContactsByLinkedId(linkedId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Contact WHERE linkedId = ?';
            const values = [linkedId];
            return yield (0, DatabaseUtils_1.executeQuery)(query, values);
        });
    }
}
exports.ContactRepository = ContactRepository;
