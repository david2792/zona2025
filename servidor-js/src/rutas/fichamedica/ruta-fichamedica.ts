import { Router } from "express";
import { fichaControlador } from "../../controlador/fichamedica/fichamedica";
import { verificarToken } from "../../middleware/verificarToken";


class RutaFicha 
{
    public router: Router = Router();
    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.put('/:id',verificarToken, fichaControlador.updateHistoriaMedica)
        this.router.get('/:id',verificarToken, fichaControlador.getHistoriaMedica)
        this.router.post('/',verificarToken, fichaControlador.createHistoriaMedica)
    }
}
const rutaFicha = new RutaFicha();
export default rutaFicha.router;