import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getPool } from "../../conexion/conexionBD";
import { Request, Response } from 'express';

class FichaControlador 
{
    private readonly SECRET = "Secret Password";

    // GET - Obtener el historial médico por idpaciente
public async getHistoriaMedica(req: Request, res: Response): Promise<void> {
  const pool = getPool();
  console.log(req.params)
  const { id } = req.params; // Recibe el idpaciente desde la URL


  try {
      const [rows] = await pool.query<RowDataPacket[]>(
          `SELECT * FROM historia_medica WHERE idpaciente = ?`,
          [id]
      );

      if (rows.length === 0) {
          res.status(404).json({ message: "No se encontró un historial médico para este paciente" });
          return;
      }

      // Retorna el historial médico encontrado
      res.status(200).json(rows[0]); // rows[0] porque asumimos que hay un solo registro por paciente
  } catch (error) {
      console.error("Error al consultar el historial médico:", error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
}

     // CREATE
  
  public async createHistoriaMedica(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const {
      gastritis,
      hipertencion,
      coagulacion,
      diabetes,
      hepatitis,
      asma,
      enfermedadescardiacas,
      protesiscardiaca,
      disturbiospsiquicos,
      tra_cabeza_cuello,
      desmayo,
      epilepsia,
      anemia,
      hemofilia,
      tuberculosis,
      sinusitis,
      vih,
      ets,
      cancer,
      otros,
      observacion,
      quirurgico,
      medicacion,
      embarazo,
      meses,
      alergias,
      idpaciente
    } = req.body;

    try {
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO historia_medica 
         (
           gastritis,
           hipertencion,
           coagulacion,
           diabetes,
           hepatitis,
           asma,
           enfermedadescardiacas,
           protesiscardiaca,
           disturbiospsiquicos,
           tra_cabeza_cuello,
           desmayo,
           epilepsia,
           anemia,
           hemofilia,
           tuberculosis,
           sinusitis,
           vih,
           ets,
           cancer,
           otros,
           observacion,
           quirurgico,
           medicacion,
           embarazo,
           meses,
           alergias,
           idpaciente
         )
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          gastritis,
          hipertencion,
          coagulacion,
          diabetes,
          hepatitis,
          asma,
          enfermedadescardiacas,
          protesiscardiaca,
          disturbiospsiquicos,
          tra_cabeza_cuello,
          desmayo,
          epilepsia,
          anemia,
          hemofilia,
          tuberculosis,
          sinusitis,
          vih,
          ets,
          cancer,
          otros,
          observacion,
          quirurgico,
          medicacion,
          embarazo,
          meses,
          alergias,
          idpaciente
        ]
      );

      // result.insertId es el idhistoria_medica que se generó
      res.status(201).json({ message: "Historia médica creada", id: result.insertId });
    } catch (error) {
      console.error("Database query error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
   // UPDATE
   public async updateHistoriaMedica(req: Request, res: Response): Promise<void> {
    const pool = getPool();
    const { id } = req.params;  // este "id" correspondería a idhistoria_medica
    const {
      gastritis,
      hipertencion,
      coagulacion,
      diabetes,
      hepatitis,
      asma,
      enfermedadescardiacas,
      protesiscardiaca,
      disturbiospsiquicos,
      tra_cabeza_cuello,
      desmayo,
      epilepsia,
      anemia,
      hemofilia,
      tuberculosis,
      sinusitis,
      vih,
      ets,
      cancer,
      otros,
      observacion,
      quirurgico,
      medicacion,
      embarazo,
      meses,
      alergias,
      idpaciente
    } = req.body;

    try {
      const [result] = await pool.query<ResultSetHeader>(
        `UPDATE historia_medica
         SET
           gastritis = ?,
           hipertencion = ?,
           coagulacion = ?,
           diabetes = ?,
           hepatitis = ?,
           asma = ?,
           enfermedadescardiacas = ?,
           protesiscardiaca = ?,
           disturbiospsiquicos = ?,
           tra_cabeza_cuello = ?,
           desmayo = ?,
           epilepsia = ?,
           anemia = ?,
           hemofilia = ?,
           tuberculosis = ?,
           sinusitis = ?,
           vih = ?,
           ets = ?,
           cancer = ?,
           otros = ?,
           observacion = ?,
           quirurgico = ?,
           medicacion = ?,
           embarazo = ?,
           meses = ?,
           alergias = ?,
           idpaciente = ?
         WHERE idhistoria_medica = ?`,
        [
          gastritis,
          hipertencion,
          coagulacion,
          diabetes,
          hepatitis,
          asma,
          enfermedadescardiacas,
          protesiscardiaca,
          disturbiospsiquicos,
          tra_cabeza_cuello,
          desmayo,
          epilepsia,
          anemia,
          hemofilia,
          tuberculosis,
          sinusitis,
          vih,
          ets,
          cancer,
          otros,
          observacion,
          quirurgico,
          medicacion,
          embarazo,
          meses,
          alergias,
          idpaciente,
          id // <-- el ID en la cláusula WHERE
        ]
      );

      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Historia médica no encontrada" });
        return 
      }

      res.status(200).json({ message: "Historia médica actualizada" });
    } catch (error) {
      console.error("Error en la consulta de actualización:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
    
}
export const fichaControlador = new FichaControlador();