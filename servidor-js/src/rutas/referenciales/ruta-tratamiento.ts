import { Router } from "express";
import { verificarToken } from "../../middleware/verificarToken";
import { tratamientoControlador } from "../../controlador/referenciales/tratamiento";


class RutaTratamiento
{
    public router: Router = Router();
    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.get('/',verificarToken, tratamientoControlador.getTratamientos)
        this.router.post('/',verificarToken, tratamientoControlador.createTratamiento)
        this.router.put('/:id',verificarToken, tratamientoControlador.updateTratamiento)
    }
}
 const rutaTratamiento = new RutaTratamiento();
export default rutaTratamiento.router;