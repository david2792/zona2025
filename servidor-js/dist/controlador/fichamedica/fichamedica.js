"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fichaControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
class FichaControlador {
    constructor() {
        this.SECRET = "Secret Password";
    }
    // GET - Obtener el historial médico por idpaciente
    getHistoriaMedica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            console.log(req.params);
            const { id } = req.params; // Recibe el idpaciente desde la URL
            try {
                const [rows] = yield pool.query(`SELECT * FROM historia_medica WHERE idpaciente = ?`, [id]);
                if (rows.length === 0) {
                    res.status(404).json({ message: "No se encontró un historial médico para este paciente" });
                    return;
                }
                // Retorna el historial médico encontrado
                res.status(200).json(rows[0]); // rows[0] porque asumimos que hay un solo registro por paciente
            }
            catch (error) {
                console.error("Error al consultar el historial médico:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    // CREATE
    createHistoriaMedica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { gastritis, hipertencion, coagulacion, diabetes, hepatitis, asma, enfermedadescardiacas, protesiscardiaca, disturbiospsiquicos, tra_cabeza_cuello, desmayo, epilepsia, anemia, hemofilia, tuberculosis, sinusitis, vih, ets, cancer, otros, observacion, quirurgico, medicacion, embarazo, meses, alergias, idpaciente } = req.body;
            try {
                const [result] = yield pool.query(`INSERT INTO historia_medica 
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
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
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
                ]);
                // result.insertId es el idhistoria_medica que se generó
                res.status(201).json({ message: "Historia médica creada", id: result.insertId });
            }
            catch (error) {
                console.error("Database query error:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    // UPDATE
    updateHistoriaMedica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params; // este "id" correspondería a idhistoria_medica
            const { gastritis, hipertencion, coagulacion, diabetes, hepatitis, asma, enfermedadescardiacas, protesiscardiaca, disturbiospsiquicos, tra_cabeza_cuello, desmayo, epilepsia, anemia, hemofilia, tuberculosis, sinusitis, vih, ets, cancer, otros, observacion, quirurgico, medicacion, embarazo, meses, alergias, idpaciente } = req.body;
            try {
                const [result] = yield pool.query(`UPDATE historia_medica
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
         WHERE idhistoria_medica = ?`, [
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
                ]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: "Historia médica no encontrada" });
                    return;
                }
                res.status(200).json({ message: "Historia médica actualizada" });
            }
            catch (error) {
                console.error("Error en la consulta de actualización:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
}
exports.fichaControlador = new FichaControlador();
