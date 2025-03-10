import { Request, Response } from 'express';
import { getPool } from '../../conexion/conexionBD';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';

class PacienteControlador {
  private readonly SECRET = "Secret Password";

  /**
   * Crear un nuevo paciente
   */
  public async createPaciente(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { nombre, apellido, fecha_nacimiento, genero, email, telefono, idciudad, cedula,observacion } = req.body;

    try {
      const [result] = await pool.query<ResultSetHeader>('INSERT INTO paciente (nombre, apellido, fecha_nacimiento, genero, email, telefono, idciudad, cedula,observacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)', [nombre, apellido, fecha_nacimiento, genero, email, telefono, idciudad, cedula,observacion]);
      res.status(201).json({ message: 'Paciente creado', id: result.insertId });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Obtener todos los pacientes
   */
  public async getPacientes(req: Request, res: Response): Promise<void> {
    const pool = getPool();

    try {
      const [rows] = await pool.query('SELECT * FROM vpaciente');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Obtener un paciente por ID
   */
  public async getPacienteById(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { id } = req.params;

    try {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM paciente WHERE idpaciente = ?', [id]);
      if (rows.length === 0) {
        res.status(404).json({ message: 'Paciente no encontrado' });
        return;
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Actualizar un paciente
   */
  public async updatePaciente(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { id } = req.params;
    const { nombre, apellido, fecha_nacimiento, genero, email, telefono, idciudad, cedula,observacion } = req.body;

    try {
      const [result] = await pool.query<ResultSetHeader>('UPDATE paciente SET nombre = ?, apellido = ?, fecha_nacimiento = ?, genero = ?, email = ?, telefono = ?, idciudad = ?, cedula = ?,observacion= ? WHERE idpaciente = ?', [nombre, apellido, fecha_nacimiento, genero, email, telefono, idciudad, cedula,observacion, id]);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Paciente no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Paciente actualizado' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Eliminar un paciente
   */
  public async deletePaciente(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { id } = req.params;

    try {
      const [result] = await pool.query<ResultSetHeader>('DELETE FROM paciente WHERE idpaciente = ?', [id]);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Paciente no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Paciente eliminado' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export const pacienteControlador = new PacienteControlador();
