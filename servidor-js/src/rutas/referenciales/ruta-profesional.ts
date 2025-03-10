import { Router } from 'express';
import { profesionalControlador } from '../../controlador/referenciales/profesional'; 
import { verificarToken } from '../../middleware/verificarToken';

class ProfesionalRutas{
    public router:Router=Router();
    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.post('/', verificarToken, profesionalControlador.createProfesional);
        this.router.get('/',verificarToken , profesionalControlador.getProfesionales);
        this.router.get('/:id',verificarToken, profesionalControlador.getProfesionalById);
        this.router.put('/:id', verificarToken, profesionalControlador.updateProfesional);
        this.router.delete('/:id',verificarToken, profesionalControlador.deleteProfesional);
    }
}



const profesionalRutas = new ProfesionalRutas();
export default profesionalRutas.router
