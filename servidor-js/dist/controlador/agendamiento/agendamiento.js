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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agendamientoControlador = void 0;
const conexionBD_1 = require("../../conexion/conexionBD");
const puppeteer_1 = __importDefault(require("puppeteer")); // Importar Puppeteer para la generación de PDF
class AgendamientoControlador {
    constructor() {
        this.SECRET = "Secret Password";
    }
    crearAgendamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { idprofesional, idpaciente, idusuario, fecha, hora, observacion, idestadoconsulta } = req.body;
            try {
                const [result] = yield pool.query('INSERT INTO citas (idprofesional, idpaciente, idusuario, fecha, hora, observacion, idestadoconsulta) VALUES (?,?,?,?,?,?,?)', [idprofesional, idpaciente, idusuario, fecha, hora, observacion.toUpperCase(), idestadoconsulta]);
                res.status(201).json({ message: 'agendamiento creado', id: result.insertId });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    obtenerAgendamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { idprofesional, fecha } = req.body;
            try {
                const [row] = yield pool.query("SELECT * FROM vagenda WHERE idprofesional = ? AND DATE(fecha) = ?", [idprofesional, fecha]);
                res.status(200).json(row);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    updateEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            const idestadoconsulta = 2;
            try {
                const [result] = yield pool.query('UPDATE citas SET idestadoconsulta = ? WHERE idcitas = ?', [idestadoconsulta, id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'estado no confirmado' });
                    return;
                }
                res.status(200).json({ message: 'estado actualizado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    updateEstadoCancelado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { id } = req.params;
            const idestadoconsulta = 4;
            try {
                const [result] = yield pool.query('UPDATE citas SET idestadoconsulta = ? WHERE idcitas = ?', [idestadoconsulta, id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'estado no confirmado' });
                    return;
                }
                res.status(200).json({ message: 'estado actualizado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    // Método para generar PDF con Puppeteer
    generarPDF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (0, conexionBD_1.getPool)();
            const { idprofesional, fecha } = req.body;
            try {
                // Obtener las citas para la fecha y el profesional dados, tipado explícito como RowDataPacket[]
                const [citas] = yield pool.query(`SELECT * FROM vagenda WHERE idprofesional = ? AND DATE(fecha) = ?`, [idprofesional, fecha]);
                // Generar horarios fijos
                const generarHorariosFijos = () => {
                    const horarios = [];
                    let inicio = new Date(fecha); // Usamos la fecha que viene en el request
                    inicio.setHours(7, 0, 0, 0); // Comienza a las 07:00
                    while (inicio.getHours() <= 18) { // Hasta las 18:00
                        const fin = new Date(inicio);
                        fin.setMinutes(fin.getMinutes() + 30); // Intervalo de 30 minutos
                        horarios.push({
                            horaInicio: inicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // '07:00', '07:30', etc.
                            horaInicioDate: new Date(inicio), // Guardamos el objeto Date para comparación
                        });
                        inicio = fin; // Actualizamos el inicio para el siguiente intervalo
                    }
                    return horarios;
                };
                // Verificar si el resultado es un array de citas
                if (Array.isArray(citas) && citas.length > 0) {
                    // Crear la plantilla HTML para el PDF
                    const htmlTemplate = `
                <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; }
                            h1 { text-align: center; color: #333; }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-top: 20px;
                            }
                            #estado{
                             width: 10%;
                            }
                            table, th, td {
                                border: 1px solid black;
                                font-size:11px;
                            }
                            th, td {
                                padding: 10px;
                                text-align: left;
                            }
                            th{
                            background: rgb(9, 235, 163);
                             font-size:15px;
                            }
                           
                           
                           .logo-container {
                                display: flex;
                                justify-content: center;
                                margin-bottom: 0px;
                            }
                            .logo-container img {
                                width: 250px;
                                height: 150px;
                                margin:-10px;
                            }
                        </style>
                    </head>
                    <body>
                   
                       
                     <div class="logo-container">
                             <img class=centrar src="data:image/png;base64,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" />
                        </div>
                  
                     
     
                    <h4>Reporte de Citas para el ${citas[0].fecha.toLocaleDateString()}</h4>
                        <h4>Odontologo/a : ${citas[0].profesional}</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th id="estado">Hora</th>
                                    <th>Paciente</th>
                                    <th id="estado">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${generarHorariosFijos().map(({ horaInicio, horaInicioDate }) => {
                        // Buscar si hay alguna cita en este intervalo de tiempo
                        const cita = citas.find((c) => {
                            // Combinamos la fecha del día con la hora de la cita ajustando correctamente la hora
                            const citaFechaHora = new Date(fecha); // Creamos un objeto Date con la fecha del día
                            const [hora, minuto] = c.hora.split(':').map(Number); // Extraemos las horas y minutos del campo 'hora'
                            citaFechaHora.setHours(hora, minuto, 0, 0); // Ajustamos la hora de la cita
                            return citaFechaHora >= horaInicioDate && citaFechaHora < new Date(horaInicioDate.getTime() + 30 * 60000); // Comparación con el intervalo de 30 minutos
                        });
                        if (cita) {
                            return `
                                            <tr>
                                                <td>${horaInicio}</td>
                                                <td>${cita.paciente}        Obs:${cita.observacion}</td>
                                                <td>${cita.descripcion}</td>
                                            </tr>
                                        `;
                        }
                        else {
                            // Si no hay citas, marcamos como "Libre"
                            return `
                                            <tr>
                                                <td>${horaInicio}</td>
                                                <td colspan="3">Libre</td>
                                            </tr>
                                        `;
                        }
                    }).join('')}
                            </tbody>
                        </table>
                    </body>
                </html>
            `;
                    // Crear un navegador usando Puppeteer
                    const browser = yield puppeteer_1.default.launch({ headless: true });
                    const page = yield browser.newPage();
                    // Cargar el contenido HTML
                    yield page.setContent(htmlTemplate);
                    // Generar el PDF y guardarlo localmente para depuración
                    yield page.pdf({ path: 'reporte_citas.pdf', format: 'A4', printBackground: true });
                    // Leer el archivo PDF generado
                    const fs = require('fs');
                    const pdfBuffer = fs.readFileSync('reporte_citas.pdf'); // Leer el archivo generado
                    yield browser.close();
                    // Enviar el archivo PDF generado al cliente
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'inline; filename=reporte_citas.pdf');
                    res.send(pdfBuffer);
                }
                else {
                    // Si no hay citas, se sigue mostrando el horario completo pero todos los espacios como "Libre"
                    const htmlTemplate = `
                <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; }
                            h1 { text-align: center; color: #333; }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-top: 20px;
                            }
                            table, th, td {
                                border: 1px solid black;
                            }
                            th, td {
                                padding: 10px;
                                text-align: left;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Reporte de Citas para el ${new Date(fecha).toLocaleDateString()}</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Hora</th>
                                    <th>Paciente</th>
                                    <th>Profesional</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${generarHorariosFijos().map(({ horaInicio }) => `
                                    <tr>
                                        <td>${horaInicio}</td>
                                        <td colspan="3">Libre</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </body>
                </html>
            `;
                    // Crear un navegador usando Puppeteer
                    // Crear un navegador usando Puppeteer
                    const browser = yield puppeteer_1.default.launch({
                        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Ruta de Chrome en Windows
                        headless: true,
                    });
                    const page = yield browser.newPage();
                    // Cargar el contenido HTML
                    yield page.setContent(htmlTemplate);
                    // Generar el PDF y guardarlo en el servidor
                    const pdfBuffer = yield page.pdf({
                        format: 'A4',
                        printBackground: true
                    });
                    yield browser.close();
                    // Enviar el archivo PDF generado al cliente
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'inline; filename=reporte_citas.pdf');
                    res.send(pdfBuffer);
                }
            }
            catch (error) {
                console.error('Error al generar el PDF:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.agendamientoControlador = new AgendamientoControlador();
