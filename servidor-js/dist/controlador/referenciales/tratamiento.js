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
exports.tratamientoControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class TratamientoControlador {
    /**
     * Crear un nuevo tratamiento
     */
    createTratamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { descripcion, precio_costo, precio_cliente, idcategoria, idimpuesto } = req.body;
            try {
                const [result] = yield pool.query('INSERT INTO tratamiento (descripcion, precio_costo, precio_cliente, idcategoria, idimpuesto) VALUES (?, ?, ?, ?, ?)', [descripcion, precio_costo, precio_cliente, idcategoria, idimpuesto]);
                res.status(201).json({ message: 'Tratamiento creado', id: result.insertId });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    /**
     * Obtener todos los tratamientos
     */
    getTratamientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            try {
                const [rows] = yield pool.query('SELECT * FROM tratamiento');
                res.status(200).json(rows);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    /**
     * Obtener un tratamiento por ID
     */
    getTratamientoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            try {
                const [rows] = yield pool.query('SELECT * FROM tratamiento WHERE idtratamiento = ?', [id]);
                if (rows.length === 0) {
                    res.status(404).json({ message: 'Tratamiento no encontrado' });
                    return;
                }
                res.status(200).json(rows[0]);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    /**
     * Actualizar un tratamiento
     */
    updateTratamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            const { descripcion, precio_costo, precio_cliente, idcategoria, idimpuesto } = req.body;
            try {
                const [result] = yield pool.query('UPDATE tratamiento SET descripcion = ?, precio_costo = ?, precio_cliente = ?, idcategoria = ?, idimpuesto = ? WHERE idtratamiento = ?', [descripcion, precio_costo, precio_cliente, idcategoria, idimpuesto, id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Tratamiento no encontrado' });
                    return;
                }
                res.status(200).json({ message: 'Tratamiento actualizado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    /**
     * Eliminar un tratamiento
     */
    deleteTratamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            try {
                const [result] = yield pool.query('DELETE FROM tratamiento WHERE idtratamiento = ?', [id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Tratamiento no encontrado' });
                    return;
                }
                res.status(200).json({ message: 'Tratamiento eliminado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.tratamientoControlador = new TratamientoControlador();
