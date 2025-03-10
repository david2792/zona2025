import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRutas from './rutas/indexRutas';
import usuarioRutas from './rutas/ruta-acceso/ruta-acceso';
import { initDB, closePool } from './conexion/conexionBD';
import pacienteRutas from './rutas/referenciales/ruta-paciente';
import rutaCiudad from './rutas/referenciales/ruta-ciudad';
import profesionalRutas from './rutas/referenciales/ruta-profesional'
import rutaestado from './rutas/referenciales/ruta-estado'
import rutaAgendamiento from './rutas/agendamiento/ruta-agendamiento'
import  rutaCategoria  from './rutas/referenciales/ruta-categoria';
import  rutaTratamiento  from './rutas/referenciales/ruta-tratamiento';
import rutaFicha from './rutas/fichamedica/ruta-fichamedica'
class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.router();
  }

  config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  router(): void {
    this.app.use('/', indexRutas);
    this.app.use('/api/usuario', usuarioRutas);
    this.app.use('/api/paciente',pacienteRutas);
    this.app.use('/api/ciudad',rutaCiudad)
    this.app.use('/api/profesional',profesionalRutas)
    this.app.use('/api/estado',rutaestado)
    this.app.use('/api/agendamiento',rutaAgendamiento)
    this.app.use('/api/categoria',rutaCategoria)
    this.app.use('/api/tratamiento',rutaTratamiento)
    this.app.use('/api/ficha',rutaFicha)

  }

  start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server running on port', this.app.get('port'));
    });
  }
}

const server = new Server();
initDB();
server.start();

process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closePool();
  process.exit(0);
});
