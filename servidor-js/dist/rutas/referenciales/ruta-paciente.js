"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paciente_1 = require("../../controlador/referenciales/paciente");
const verificarToken_1 = require("../../middleware/verificarToken");
class PacienteRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', verificarToken_1.verificarToken, paciente_1.pacienteControlador.createPaciente);
        this.router.get('/', verificarToken_1.verificarToken, paciente_1.pacienteControlador.getPacientes);
        this.router.get('/:id', verificarToken_1.verificarToken, paciente_1.pacienteControlador.getPacienteById);
        this.router.put('/:id', verificarToken_1.verificarToken, paciente_1.pacienteControlador.updatePaciente);
        this.router.delete('/:id', verificarToken_1.verificarToken, paciente_1.pacienteControlador.deletePaciente);
    }
}
const pacienteRutas = new PacienteRutas();
exports.default = pacienteRutas.router;
