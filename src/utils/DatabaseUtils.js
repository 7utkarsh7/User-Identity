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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    // Configure the database connection details
    host: process.env.PGHOST,
    port: parseInt((_a = process.env.PGPORT) !== null && _a !== void 0 ? _a : '', 10),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});
// Helper function to check if the query is a table creation query
function isCreateTableQuery(query) {
    return query.trim().toLowerCase().startsWith('create table');
}
// Function to get a new connection from the pool
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield pool.getConnection();
        try {
            // Execute the create table query
            yield connection.query(`
      CREATE TABLE IF NOT EXISTS Contact (
        id int(11) NOT NULL AUTO_INCREMENT,
        phoneNumber text,
        email text,
        linkedId int(11) DEFAULT NULL,
        linkPrecedence text,
        createdAt text,
        updatedAt text,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;
    `);
        }
        catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
        return connection;
    });
}
function executeQuery(query, values, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield getConnection();
        try {
            // For other queries (SELECT, INSERT, etc.), execute normally
            const [rows, fields] = yield connection.query(query, values);
            return rows;
        }
        finally {
            connection.release();
        }
    });
}
exports.executeQuery = executeQuery;
