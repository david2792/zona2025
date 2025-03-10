"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_1 = require("../../controlador/referenciales/estado");
const verificarToken_1 = require("../../middleware/verificarToken");
class RutaEstado {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', verificarToken_1.verificarToken, estado_1.estadoControldor.obtenerEstado);
        this.router.post('/', verificarToken_1.verificarToken, estado_1.estadoControldor.crearEstado);
    }
}
const rutaestado = new RutaEstado();
exports.default = rutaestado.router;
