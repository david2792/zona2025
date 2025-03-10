import { Router } from 'express';
import {indexControlador} from '../controlador/indexControlador';

class IndexRutas 
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',indexControlador.index);

   }

   
}

const indexRutas = new IndexRutas();
 export default indexRutas.router;