"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fichamedica_1 = require("../../controlador/fichamedica/fichamedica");
const verificarToken_1 = require("../../middleware/verificarToken");
class RutaFicha {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.put('/:id', verificarToken_1.verificarToken, fichamedica_1.fichaControlador.updateHistoriaMedica);
        this.router.get('/:id', verificarToken_1.verificarToken, fichamedica_1.fichaControlador.getHistoriaMedica);
        this.router.post('/', verificarToken_1.verificarToken, fichamedica_1.fichaControlador.createHistoriaMedica);
    }
}
const rutaFicha = new RutaFicha();
exports.default = rutaFicha.router;
