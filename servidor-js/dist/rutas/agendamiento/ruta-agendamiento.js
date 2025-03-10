"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agendamiento_1 = require("../../controlador/agendamiento/agendamiento");
const verificarToken_1 = require("../../middleware/verificarToken");
class RutaAgendamiento {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', verificarToken_1.verificarToken, agendamiento_1.agendamientoControlador.crearAgendamiento);
        this.router.post('/agenda', verificarToken_1.verificarToken, agendamiento_1.agendamientoControlador.obtenerAgendamiento);
        this.router.put('/agenda/:id', verificarToken_1.verificarToken, agendamiento_1.agendamientoControlador.updateEstado);
        this.router.post('/informe', verificarToken_1.verificarToken, agendamiento_1.agendamientoControlador.generarPDF);
        this.router.put('/cancelar/:id', verificarToken_1.verificarToken, agendamiento_1.agendamientoControlador.updateEstadoCancelado);
    }
}
const rutaAgendamiento = new RutaAgendamiento();
exports.default = rutaAgendamiento.router;
