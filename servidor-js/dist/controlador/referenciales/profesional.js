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
exports.profesionalControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class ProfesionalControlador {
    /**
     * Crear un nuevo profesional
     */
    createProfesional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { nombre, apellido, telefono, especialidad } = req.body;
            try {
                const [result] = yield pool.query('INSERT INTO profesional (nombre, apellido, telefono, especialidad) VALUES (?, ?, ?, ?)', [nombre, apellido, telefono, especialidad]);
                res.status(201).json({ message: 'Profesional creado', id: result.insertId });
            }
            catch (error) {
                console.error('Error en la consulta de creación:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    /**
     * Obtener todos los profesionales
     */
    getProfesionales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            try {
                const [rows] = yield pool.query('SELECT idprofesional, CONCAT(nombre," ",apellido) AS nombre FROM profesional');
                res.status(200).json(rows);
            }
            catch (error) {
                console.error('Error en la consulta de obtención:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    /**
     * Obtener un profesional por ID
     */
    getProfesionalById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            try {
                const [rows] = yield pool.query('SELECT * FROM profesional WHERE idprofesional = ?', [id]);
                if (rows.length === 0) {
                    res.status(404).json({ message: 'Profesional no encontrado' });
                    return;
                }
                res.status(200).json(rows[0]);
            }
            catch (error) {
                console.error('Error en la consulta de obtención por ID:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    /**
     * Actualizar un profesional
     */
    updateProfesional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            const { nombre, apellido, telefono, especialidad } = req.body;
            try {
                const [result] = yield pool.query('UPDATE profesional SET nombre = ?, apellido = ?, telefono = ?, especialidad = ? WHERE idprofesional = ?', [nombre, apellido, telefono, especialidad, id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Profesional no encontrado' });
                    return;
                }
                res.status(200).json({ message: 'Profesional actualizado' });
            }
            catch (error) {
                console.error('Error en la consulta de actualización:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    /**
     * Eliminar un profesional
     */
    deleteProfesional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            try {
                const [result] = yield pool.query('DELETE FROM profesional WHERE idprofesional = ?', [id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Profesional no encontrado' });
                    return;
                }
                res.status(200).json({ message: 'Profesional eliminado' });
            }
            catch (error) {
                console.error('Error en la consulta de eliminación:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
exports.profesionalControlador = new ProfesionalControlador();
