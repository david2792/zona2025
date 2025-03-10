import { Router } from "express";
import { categoriaControlador } from "../../controlador/referenciales/categoria";
import { verificarToken } from "../../middleware/verificarToken";


class RutaCategoria
{
    public router: Router = Router();
    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.get('/',verificarToken, categoriaControlador.obtenerCategoria)
        this.router.post('/',verificarToken, categoriaControlador.crearCategoria)
        this.router.put('/:id',verificarToken, categoriaControlador.updateCategoria)
    }
}
 const rutaCategoria = new RutaCategoria();
export default rutaCategoria.router;