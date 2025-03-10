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
exports.usuarioControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsuarioControlador {
    constructor() {
        this.SECRET = "Secret Password";
        /**
         * acceso al sistema
         */
        this.acceso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            try {
                const { usuario, clave } = req.body;
                if (!usuario || !clave) {
                    res.status(400).json({ error: "Usuario y contraseña son requeridos" });
                    return;
                }
                const [rows] = yield pool.query('SELECT * FROM usuario WHERE usuario=? AND clave=?', [usuario, clave]);
                if (rows.length === 0) {
                    res.status(401).json({ error: "Credenciales inválidas" });
                    return;
                }
                const datosusuario = rows[0];
                const tokenData = {
                    idusuario: datosusuario.idusuario,
                    usuario: datosusuario.usuario,
                    nombre: `${datosusuario.nombre} ${datosusuario.apellido}`,
                    descripcion: datosusuario.descripcion
                };
                const token = jsonwebtoken_1.default.sign(tokenData, this.SECRET, { expiresIn: "8h" });
                res.header('auth-token', token).json({ token, tokenData });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
        this.verificar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
            if (!token) {
                res.status(401).json({ error: "Es necesario el token de autenticación" });
                return;
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, this.SECRET);
                res.json({ message: 'Token válido', user: decoded });
            }
            catch (err) {
                res.status(401).json({ error: 'Token inválido' });
            }
        });
    }
}
exports.usuarioControlador = new UsuarioControlador();
