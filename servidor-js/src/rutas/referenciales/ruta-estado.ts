import { Router } from "express";
import { estadoControldor } from "../../controlador/referenciales/estado";
import { verificarToken } from "../../middleware/verificarToken";


class RutaEstado 
{
    public router: Router = Router();
    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.get('/',verificarToken, estadoControldor.obtenerEstado)
        this.router.post('/',verificarToken, estadoControldor.crearEstado)
    }
}
const rutaestado = new RutaEstado();
export default rutaestado.router;