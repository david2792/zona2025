"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ciudad_1 = require("../../controlador/referenciales/ciudad");
const verificarToken_1 = require("../../middleware/verificarToken");
class RutaCiudad {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', verificarToken_1.verificarToken, ciudad_1.ciudadControlador.obtenerCiudad);
        this.router.post('/', verificarToken_1.verificarToken, ciudad_1.ciudadControlador.crearCiudad);
    }
}
const rutaCiudad = new RutaCiudad();
exports.default = rutaCiudad.router;
