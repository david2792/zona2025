import { Request, Response } from 'express';
import { getPool } from '../../conexion/conexionBD';
import jwt from 'jsonwebtoken';

class UsuarioControlador {
  private readonly SECRET = "Secret Password";

  /**
   * acceso al sistema
   */
  public acceso = async (req: Request, res: Response): Promise<void> => {
    const pool = getPool();

    try {
      const { usuario, clave } = req.body;

      if (!usuario || !clave) {
        res.status(400).json({ error: "Usuario y contraseña son requeridos" });
        return;
      }

      const [rows]: any = await pool.query('SELECT * FROM usuario WHERE usuario=? AND clave=?', [usuario, clave]);

      if (rows.length === 0) {
        res.status(401).json({ error: "Credenciales inválidas" });
        return;
      }

      const datosusuario = rows[0];
      const tokenData = {
        idusuario: datosusuario.idusuario,
        usuario: datosusuario.usuario,
        nombre: `${datosusuario.nombre} ${datosusuario.apellido}`,
        descripcion: datosusuario.descripcion
      };

      const token = jwt.sign(tokenData, this.SECRET, { expiresIn: "8h" });

      res.header('auth-token', token).json({ token, tokenData });

    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public verificar = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: "Es necesario el token de autenticación" });
      return;
    }

    try {
      const decoded = jwt.verify(token, this.SECRET);
      res.json({ message: 'Token válido', user: decoded });
    } catch (err) {
      res.status(401).json({ error: 'Token inválido' });
    }
  }
}

export const usuarioControlador = new UsuarioControlador();
