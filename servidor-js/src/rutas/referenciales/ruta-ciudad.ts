import { Router } from "express";
import { ciudadControlador } from "../../controlador/referenciales/ciudad";
import { verificarToken } from "../../middleware/verificarToken";


class RutaCiudad 
{
    public router: Router = Router();
    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.get('/',verificarToken, ciudadControlador.obtenerCiudad)
        this.router.post('/',verificarToken, ciudadControlador.crearCiudad)
    }
}
const rutaCiudad = new RutaCiudad();
export default rutaCiudad.router;