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
exports.categoriaControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class CategoriaControlador {
    constructor() {
        this.SECRET = "Secret Password";
    }
    crearCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { descripcion } = req.body;
            try {
                const [result] = yield pool.query('INSERT INTO categoria (descripcion) VALUES (?)', [descripcion.toUpperCase()]);
                res.status(201).json({ message: 'ciudad creada', id: result.insertId });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    obtenerCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            try {
                const [row] = yield pool.query("SELECT * FROM categoria");
                res.status(200).json(row);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    updateCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            const { descripcion } = req.body;
            try {
                const [result] = yield pool.query('UPDATE categoria SET descripcion = ? WHERE idcategoria = ?', [descripcion, id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'categoria no encontrado' });
                    return;
                }
                res.status(200).json({ message: 'categoria actualizado' });
            }
            catch (error) {
                console.error('Error en la consulta de actualización:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
exports.categoriaControlador = new CategoriaControlador();
