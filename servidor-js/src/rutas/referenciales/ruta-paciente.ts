import { Router } from 'express';
import { pacienteControlador } from '../../controlador/referenciales/paciente';
import { verificarToken } from '../../middleware/verificarToken';

class PacienteRutas{
    public router:Router=Router();
    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.post('/', verificarToken, pacienteControlador.createPaciente);
        this.router.get('/',verificarToken , pacienteControlador.getPacientes);
        this.router.get('/:id',verificarToken, pacienteControlador.getPacienteById);
        this.router.put('/:id', verificarToken, pacienteControlador.updatePaciente);
        this.router.delete('/:id',verificarToken, pacienteControlador.deletePaciente);
    }
}



const pacienteRutas = new PacienteRutas();
export default pacienteRutas.router
