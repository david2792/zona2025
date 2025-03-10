import { ResultSetHeader } from "mysql2";
import { getPool } from "../../conexion/conexionBD";
import { Request, Response } from 'express';

class CiudadControlador 
{
    private readonly SECRET = "Secret Password";
    public async crearCiudad(req: Request, res: Response): Promise<void> {
        const pool = getPool();
        const { descripcion} = req.body;
    
        try {
          const [result] = await pool.query<ResultSetHeader>('INSERT INTO ciudad (descripcion) VALUES (?)', [descripcion.toUpperCase()]);
          res.status(201).json({ message: 'ciudad creada', id: result.insertId });
        } catch (error) {
          console.error('Database query error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

      public async obtenerCiudad(req: Request, res: Response): Promise<void>{
        const pool = getPool();
        try {
            const [row] =await pool.query("SELECT * FROM ciudad");
            res.status(200).json(row)
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}
export const ciudadControlador = new CiudadControlador();