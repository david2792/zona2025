"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_1 = require("../../controlador/referenciales/categoria");
const verificarToken_1 = require("../../middleware/verificarToken");
class RutaCategoria {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', verificarToken_1.verificarToken, categoria_1.categoriaControlador.obtenerCategoria);
        this.router.post('/', verificarToken_1.verificarToken, categoria_1.categoriaControlador.crearCategoria);
        this.router.put('/:id', verificarToken_1.verificarToken, categoria_1.categoriaControlador.updateCategoria);
    }
}
const rutaCategoria = new RutaCategoria();
exports.default = rutaCategoria.router;
