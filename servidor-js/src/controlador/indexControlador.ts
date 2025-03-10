  
import {Request, Response} from 'express';

class IndexControlador
{
 public index (req:Request,res:Response){
    res.json({tex:'/api/ '});
  } 
}

export const indexControlador = new IndexControlador();