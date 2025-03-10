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
exports.pacienteControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class PacienteControlador {
    constructor() {
        this.SECRET = "Secret Password";
    }
    /**
     * Crear un nuevo paciente
     */
    createPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { nombre, apellido, fecha_nacimiento, genero, email, telefono, idciudad, cedula, observacion } = req.body;
            try {
                const [result] = yield pool.query('INSERT INTO paciente (nombre, apellido, fecha_nacimiento, genero, email, telefono, idciudad, cedula,observacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)', [nombre, apellido, fecha_nacimiento, genero, email, telefono, idciudad, cedula, observacion]);
                res.status(201).json({ message: 'Paciente creado', id: result.insertId });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    /**
     * Obtener todos los pacientes
     */
    getPacientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            try {
                const [rows] = yield pool.query('SELECT * FROM vpaciente');
                res.status(200).json(rows);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    /**
     * Obtener un paciente por ID
     */
    getPacienteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            try {
                const [rows] = yield pool.query('SELECT * FROM paciente WHERE idpaciente = ?', [id]);
                if (rows.length === 0) {
                    res.status(404).json({ message: 'Paciente no encontrado' });
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
     * Actualizar un paciente
     */
    updatePaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            const { nombre, apellido, fecha_nacimiento, genero, email, telefono, idciudad, cedula, observacion } = req.body;
            try {
                const [result] = yield pool.query('UPDATE paciente SET nombre = ?, apellido = ?, fecha_nacimiento = ?, genero = ?, email = ?, telefono = ?, idciudad = ?, cedula = ?,observacion= ? WHERE idpaciente = ?', [nombre, apellido, fecha_nacimiento, genero, email, telefono, idciudad, cedula, observacion, id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Paciente no encontrado' });
                    return;
                }
                res.status(200).json({ message: 'Paciente actualizado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    /**
     * Eliminar un paciente
     */
    deletePaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            try {
                const [result] = yield pool.query('DELETE FROM paciente WHERE idpaciente = ?', [id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Paciente no encontrado' });
                    return;
                }
                res.status(200).json({ message: 'Paciente eliminado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.pacienteControlador = new PacienteControlador();
