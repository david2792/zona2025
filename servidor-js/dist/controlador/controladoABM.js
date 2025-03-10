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
exports.abm = void 0;
const conexionBD_1 = require("../conexion/conexionBD");
class ABM {
    consultar(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = (0, conexionBD_1.getPool)();
            try {
                let lista = yield conexion.query(sql);
                conexion.end();
                return lista;
            }
            catch (error) {
                conexion.end();
                console.error("ocurrio un error en la consulta: " + error);
            }
        });
    }
    insertar(sql, valores) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensaje = 'Los datos se guardaron correctamente';
            const conexion = (0, conexionBD_1.getPool)();
            try {
                let agregar = yield conexion.query(sql, valores);
                conexion.end();
                //return mensaje
            }
            catch (error) {
                conexion.end();
                // console.error("ocurrio un error en la consulta: "+error)
                return error;
            }
        });
    }
    modificar(sql, valores) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensaje = 'Los datos se modificaron correctamente';
            const conexion = (0, conexionBD_1.getPool)();
            try {
                let agregar = yield conexion.query(sql, valores);
                conexion.end();
                return mensaje;
            }
            catch (error) {
                conexion.end();
                console.error("ocurrio un error en la consulta: " + error);
                return mensaje = "Ocurio un error " + error;
            }
        });
    }
}
exports.abm = new ABM();
