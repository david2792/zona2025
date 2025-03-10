"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "Secret Password";
const verificarToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: "Es necesario el token de autenticación" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        req.decoded = decoded; // Almacena el token decodificado en `req` temporalmente
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};
exports.verificarToken = verificarToken;
