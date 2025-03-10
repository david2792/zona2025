import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = "Secret Password";

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: "Es necesario el token de autenticación" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    (req as any).decoded = decoded;  // Almacena el token decodificado en `req` temporalmente
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
