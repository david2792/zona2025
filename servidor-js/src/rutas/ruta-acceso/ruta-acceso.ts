import { Router } from 'express';
import {usuarioControlador} from '../../controlador/acceso/usuario';

class AccesoRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
     
       this.router.post('/login',usuarioControlador.acceso);
      //this.router.post('/',listaPrecioControlador.crear);
   }
}

const accesoRutas = new AccesoRutas();
 export default accesoRutas.router;