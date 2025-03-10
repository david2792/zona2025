import { ResultSetHeader } from "mysql2";
import { getPool } from "../../conexion/conexionBD";
import { Request, Response } from 'express';

class EstadoControlador 
{
    private readonly SECRET = "Secret Password";
    public async crearEstado(req: Request, res: Response): Promise<void> {
        const pool = getPool();
        const { descripcion} = req.body;
    
        try {
          const [result] = await pool.query<ResultSetHeader>('INSERT INTO estadoconsulta (descripcion) VALUES (?)', [descripcion.toUpperCase()]);
          res.status(201).json({ message: 'estado creado', id: result.insertId });
        } catch (error) {
          console.error('Database query error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

      public async obtenerEstado(req: Request, res: Response): Promise<void>{
        const pool = getPool();
        try {
            const [row] =await pool.query("SELECT * FROM estadoconsulta");
            res.status(200).json(row)
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}
export const estadoControldor = new EstadoControlador();