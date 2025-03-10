"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profesional_1 = require("../../controlador/referenciales/profesional");
const verificarToken_1 = require("../../middleware/verificarToken");
class ProfesionalRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', verificarToken_1.verificarToken, profesional_1.profesionalControlador.createProfesional);
        this.router.get('/', verificarToken_1.verificarToken, profesional_1.profesionalControlador.getProfesionales);
        this.router.get('/:id', verificarToken_1.verificarToken, profesional_1.profesionalControlador.getProfesionalById);
        this.router.put('/:id', verificarToken_1.verificarToken, profesional_1.profesionalControlador.updateProfesional);
        this.router.delete('/:id', verificarToken_1.verificarToken, profesional_1.profesionalControlador.deleteProfesional);
    }
}
const profesionalRutas = new ProfesionalRutas();
exports.default = profesionalRutas.router;
