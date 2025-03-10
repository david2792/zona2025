"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verificarToken_1 = require("../../middleware/verificarToken");
const tratamiento_1 = require("../../controlador/referenciales/tratamiento");
class RutaTratamiento {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', verificarToken_1.verificarToken, tratamiento_1.tratamientoControlador.getTratamientos);
        this.router.post('/', verificarToken_1.verificarToken, tratamiento_1.tratamientoControlador.createTratamiento);
        this.router.put('/:id', verificarToken_1.verificarToken, tratamiento_1.tratamientoControlador.updateTratamiento);
    }
}
const rutaTratamiento = new RutaTratamiento();
exports.default = rutaTratamiento.router;
