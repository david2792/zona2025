"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../../controlador/acceso/usuario");
class AccesoRutas {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/login', usuario_1.usuarioControlador.acceso);
        //this.router.post('/',listaPrecioControlador.crear);
    }
}
const accesoRutas = new AccesoRutas();
exports.default = accesoRutas.router;
