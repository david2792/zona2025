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
exports.closePool = exports.getPool = exports.initDB = void 0;
const promise_1 = require("mysql2/promise");
const bdconfig_1 = __importDefault(require("./bdconfig"));
let pool;
const initDB = () => {
    try {
        console.log('Attempting to create database connection pool with config:', bdconfig_1.default.database);
        pool = (0, promise_1.createPool)(bdconfig_1.default.database);
        console.log('Database connection pool created');
    }
    catch (error) {
        console.error('Error initializing database connection pool:', error);
        throw new Error('Error al iniciar base de datos');
    }
};
exports.initDB = initDB;
const getPool = () => {
    if (!pool) {
        console.error('Database pool not initialized');
        throw new Error('Database pool not initialized');
    }
    return pool;
};
exports.getPool = getPool;
const closePool = () => __awaiter(void 0, void 0, void 0, function* () {
    if (pool) {
        try {
            yield pool.end();
            console.log('Database connection pool closed');
        }
        catch (error) {
            console.error('Error closing database connection pool:', error);
        }
    }
});
exports.closePool = closePool;
