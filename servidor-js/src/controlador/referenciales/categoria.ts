import { ResultSetHeader } from "mysql2";
import { getPool } from "../../conexion/conexionBD";
import { Request, Response } from 'express';

class CategoriaControlador 
{
    private readonly SECRET = "Secret Password";
    public async crearCategoria(req: Request, res: Response): Promise<void> {
        const pool = getPool();
        const { descripcion} = req.body;
    
        try {
          const [result] = await pool.query<ResultSetHeader>('INSERT INTO categoria (descripcion) VALUES (?)', [descripcion.toUpperCase()]);
          res.status(201).json({ message: 'ciudad creada', id: result.insertId });
        } catch (error) {
          console.error('Database query error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

      public async obtenerCategoria(req: Request, res: Response): Promise<void>{
        const pool = getPool();
        try {
            const [row] =await pool.query("SELECT * FROM categoria");
            res.status(200).json(row)
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      }

      public async updateCategoria(req: Request, res: Response): Promise<void> {
        const pool = getPool();
        const { id } = req.params;
        const { descripcion } = req.body;
    
        try {
          const [result] = await pool.query<ResultSetHeader>(
            'UPDATE categoria SET descripcion = ? WHERE idcategoria = ?',
            [descripcion, id]
          );
          if (result.affectedRows === 0) {
            res.status(404).json({ message: 'categoria no encontrado' });
            return;
          }
          res.status(200).json({ message: 'categoria actualizado' });
        } catch (error) {
          console.error('Error en la consulta de actualización:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
        }
      }
    
}
export const categoriaControlador = new CategoriaControlador();