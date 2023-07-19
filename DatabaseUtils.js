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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    // Configure the database connection details
    host: process.env.PGHOST,
    port: 3306,
    user: 'user',
    password: '',
    database: 'test',
});
function executeQuery(query, values, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield pool.getConnection();
        try {
            const [rows, fields] = yield connection.query(query, values);
            return rows;
        }
        finally {
            connection.release();
        }
    });
}
exports.executeQuery = executeQuery;
