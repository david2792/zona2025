import { Request, Response } from 'express';
import { getPool } from '../../conexion/conexionBD';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class ProfesionalControlador {
  /**
   * Crear un nuevo profesional
   */
  public async createProfesional(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { nombre, apellido, telefono, especialidad } = req.body;

    try {
      const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO profesional (nombre, apellido, telefono, especialidad) VALUES (?, ?, ?, ?)',
        [nombre, apellido, telefono, especialidad]
      );
      res.status(201).json({ message: 'Profesional creado', id: result.insertId });
    } catch (error) {
      console.error('Error en la consulta de creación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * Obtener todos los profesionales
   */
  public async getProfesionales(req: Request, res: Response): Promise<void> {
    const pool = getPool();

    try {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT idprofesional, CONCAT(nombre," ",apellido) AS nombre FROM profesional');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error en la consulta de obtención:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * Obtener un profesional por ID
   */
  public async getProfesionalById(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { id } = req.params;

    try {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM profesional WHERE idprofesional = ?', [id]);
      if (rows.length === 0) {
        res.status(404).json({ message: 'Profesional no encontrado' });
        return;
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error en la consulta de obtención por ID:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * Actualizar un profesional
   */
  public async updateProfesional(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { id } = req.params;
    const { nombre, apellido, telefono, especialidad } = req.body;

    try {
      const [result] = await pool.query<ResultSetHeader>(
        'UPDATE profesional SET nombre = ?, apellido = ?, telefono = ?, especialidad = ? WHERE idprofesional = ?',
        [nombre, apellido, telefono, especialidad, id]
      );
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Profesional no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Profesional actualizado' });
    } catch (error) {
      console.error('Error en la consulta de actualización:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * Eliminar un profesional
   */
  public async deleteProfesional(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { id } = req.params;

    try {
      const [result] = await pool.query<ResultSetHeader>(
        'DELETE FROM profesional WHERE idprofesional = ?',
        [id]
      );
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Profesional no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Profesional eliminado' });
    } catch (error) {
      console.error('Error en la consulta de eliminación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export const profesionalControlador = new ProfesionalControlador();
