import { Request, Response } from 'express';
import { getPool } from '../../conexion/conexionBD';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class TratamientoControlador {

  /**
   * Crear un nuevo tratamiento
   */
  public async createTratamiento(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { descripcion, precio_costo, precio_cliente, idcategoria, idimpuesto } = req.body;

    try {
      const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO tratamiento (descripcion, precio_costo, precio_cliente, idcategoria, idimpuesto) VALUES (?, ?, ?, ?, ?)', 
        [descripcion, precio_costo, precio_cliente, idcategoria, idimpuesto]
      );
      res.status(201).json({ message: 'Tratamiento creado', id: result.insertId });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Obtener todos los tratamientos
   */
  public async getTratamientos(req: Request, res: Response): Promise<void> {
    const pool = getPool();

    try {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tratamiento');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Obtener un tratamiento por ID
   */
  public async getTratamientoById(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { id } = req.params;

    try {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tratamiento WHERE idtratamiento = ?', [id]);
      if (rows.length === 0) {
        res.status(404).json({ message: 'Tratamiento no encontrado' });
        return;
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Actualizar un tratamiento
   */
  public async updateTratamiento(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { id } = req.params;
    const { descripcion, precio_costo, precio_cliente, idcategoria, idimpuesto } = req.body;

    try {
      const [result] = await pool.query<ResultSetHeader>(
        'UPDATE tratamiento SET descripcion = ?, precio_costo = ?, precio_cliente = ?, idcategoria = ?, idimpuesto = ? WHERE idtratamiento = ?', 
        [descripcion, precio_costo, precio_cliente, idcategoria, idimpuesto, id]
      );
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Tratamiento no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Tratamiento actualizado' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Eliminar un tratamiento
   */
  public async deleteTratamiento(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { id } = req.params;

    try {
      const [result] = await pool.query<ResultSetHeader>('DELETE FROM tratamiento WHERE idtratamiento = ?', [id]);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Tratamiento no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Tratamiento eliminado' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export const tratamientoControlador = new TratamientoControlador();
