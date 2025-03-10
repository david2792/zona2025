import { Router } from "express";
import { agendamientoControlador } from "../../controlador/agendamiento/agendamiento"; 
import { verificarToken } from "../../middleware/verificarToken";


class RutaAgendamiento 
{
    public router: Router = Router();
    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.post('/',verificarToken, agendamientoControlador.crearAgendamiento)
        this.router.post('/agenda',verificarToken, agendamientoControlador.obtenerAgendamiento)
        this.router.put('/agenda/:id',verificarToken, agendamientoControlador.updateEstado)
        this.router.post('/informe',verificarToken, agendamientoControlador.generarPDF)
        this.router.put('/cancelar/:id',verificarToken, agendamientoControlador.updateEstadoCancelado)
    }
}
const rutaAgendamiento = new RutaAgendamiento();
export default rutaAgendamiento.router;