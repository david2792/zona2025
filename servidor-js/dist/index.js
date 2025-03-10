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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRutas_1 = __importDefault(require("./rutas/indexRutas"));
const ruta_acceso_1 = __importDefault(require("./rutas/ruta-acceso/ruta-acceso"));
const conexionBD_1 = require("./conexion/conexionBD");
const ruta_paciente_1 = __importDefault(require("./rutas/referenciales/ruta-paciente"));
const ruta_ciudad_1 = __importDefault(require("./rutas/referenciales/ruta-ciudad"));
const ruta_profesional_1 = __importDefault(require("./rutas/referenciales/ruta-profesional"));
const ruta_estado_1 = __importDefault(require("./rutas/referenciales/ruta-estado"));
const ruta_agendamiento_1 = __importDefault(require("./rutas/agendamiento/ruta-agendamiento"));
const ruta_categoria_1 = __importDefault(require("./rutas/referenciales/ruta-categoria"));
const ruta_tratamiento_1 = __importDefault(require("./rutas/referenciales/ruta-tratamiento"));
const ruta_fichamedica_1 = __importDefault(require("./rutas/fichamedica/ruta-fichamedica"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.router();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    router() {
        this.app.use('/', indexRutas_1.default);
        this.app.use('/api/usuario', ruta_acceso_1.default);
        this.app.use('/api/paciente', ruta_paciente_1.default);
        this.app.use('/api/ciudad', ruta_ciudad_1.default);
        this.app.use('/api/profesional', ruta_profesional_1.default);
        this.app.use('/api/estado', ruta_estado_1.default);
        this.app.use('/api/agendamiento', ruta_agendamiento_1.default);
        this.app.use('/api/categoria', ruta_categoria_1.default);
        this.app.use('/api/tratamiento', ruta_tratamiento_1.default);
        this.app.use('/api/ficha', ruta_fichamedica_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port', this.app.get('port'));
        });
    }
}
const server = new Server();
(0, conexionBD_1.initDB)();
server.start();
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, conexionBD_1.closePool)();
    process.exit(0);
}));
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, conexionBD_1.closePool)();
    process.exit(0);
}));
