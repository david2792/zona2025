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
exports.estadoControldor = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class EstadoControlador {
    constructor() {
        this.SECRET = "Secret Password";
    }
    crearEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { descripcion } = req.body;
            try {
                const [result] = yield pool.query('INSERT INTO estadoconsulta (descripcion) VALUES (?)', [descripcion.toUpperCase()]);
                res.status(201).json({ message: 'estado creado', id: result.insertId });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    obtenerEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            try {
                const [row] = yield pool.query("SELECT * FROM estadoconsulta");
                res.status(200).json(row);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.estadoControldor = new EstadoControlador();
