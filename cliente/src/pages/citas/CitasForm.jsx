import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Calendar as PrimeCalendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axiosInstance from '../../API/apiConfig';
import { format } from 'date-fns';
import "../../assets/styles/citas.css"
const CitaForm = ({toast}) => {
  const [cita, setCita] = useState({
    idcitas: '',
    idprofesional: null,
    idpaciente: null,
    idusuario: null,
    fecha: null,
    hora: null,
    observacion: '',
    idestadoconsulta: null,
  });

  // Estados para profesionales y usuarios
  const [profesionales, setProfesionales] = useState([]);
  const [usuarios, setUsuarios] = useState('');
  const [estadosConsulta, setEstadosConsulta] = useState([]);

  // Estados para el diálogo de pacientes
  const [displayDialog, setDisplayDialog] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const es = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    today: "Hoy",
    clear: "Claro"
};


  useEffect(() => {
    const idusuario = sessionStorage.getItem("idusuario");
    const nombreUsuario = sessionStorage.getItem("nombreUsuario");
  
    if (!idusuario || !nombreUsuario) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Sesión no iniciada',
        detail: 'Debe iniciar sesión para registrar una cita.'
      });
      return;
    }
  
    setUsuarios(`${idusuario}-${nombreUsuario}`);
    // Cargar profesionales
    axiosInstance
      .get('profesional')
      .then((response) => {
        setProfesionales(transformarDatosDropdown(response.data, 'idprofesional', 'nombre'));
      })
      .catch((error) => console.error('Error al cargar profesionales:', error));

    // Cargar usuarios
        const usu = sessionStorage.getItem("idusuario")+"-"+sessionStorage.getItem("nombreUsuario")
        setUsuarios(usu);
       // console(sessionStorage.getItem('idusuario'))
    // Cargar estados de consulta
    axiosInstance
      .get('estado')
      .then((response) => {
        setEstadosConsulta(transformarDatosDropdown(response.data, 'idestadoconsulta', 'descripcion'));
      })
      .catch((error) => console.error('Error al cargar estados de consulta:', error));
  }, []);

  // Función para transformar los datos para el Dropdown
  const transformarDatosDropdown = (data, valueField, labelField) => {
    return data.map((item) => ({
      label: item[labelField],
      value: item[valueField],
    }));
  };

  const handleChange = (e, field) => {
    const val = e.target && e.target.value;
    setCita({ ...cita, [field]: val });
  };

  const handleSubmit = () => {
    if (!cita.idprofesional || !cita.idpaciente || !cita.fecha || !cita.hora) {
      toast.current.show({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Por favor, complete todos los campos obligatorios.',
      });
      return;
    }

    // Combinar fecha y hora
    const fechaHora = new Date(cita.fecha);
    fechaHora.setHours(cita.hora.getHours());
    fechaHora.setMinutes(cita.hora.getMinutes());
    console.log(fechaHora)
    const citaData = {
      ...cita
    };
    const horaFormateada = format(cita.hora, 'HH:mm');  
    const fechacita = fechaHora ? format(fechaHora, 'yyyy-MM-dd') : null;
citaData.idusuario=sessionStorage.getItem('idusuario')
citaData.fecha=fechacita
citaData.hora=horaFormateada
console.log(citaData)
    axiosInstance
      .post('agendamiento', citaData)
      .then((response) => {
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cita guardada correctamente.',
        });
        // Reiniciar el formulario si es necesario
        setCita({
          idcitas: '',
          idprofesional: null,
          idpaciente: null,
          idusuario: null,
          fecha: null,
          hora: null,
          observacion: '',
          idestadoconsulta: null,
        });
        setSelectedPaciente(null);
      })
      .catch((error) => {
        console.error('Error al guardar la cita:', error);
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar la cita.',
        });
      });
  };

  // Funciones para el diálogo de pacientes
  const fetchPacientes = () => {
    axiosInstance 
      .get('/paciente')
      .then((response) => {
        setPacientes(response.data);
        console.log(response.data)
      })
      .catch((error) => console.error('Error al cargar pacientes:', error));
  };

  const showDialog = () => {
    fetchPacientes();
    setDisplayDialog(true);
  };

  const hideDialog = () => {
    setDisplayDialog(false);
  };

  const onPacienteSelect = (paciente) => {
    setSelectedPaciente(paciente);
    setCita({ ...cita, idpaciente: paciente.idpaciente });
    hideDialog();
  };

  const renderHeader = () => {
    return (
      <div className="p-d-flex p-jc-center">
        <span className="p-input-icon-left w-full">
        
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
            className="w-full"
          />
        </span>
      </div>
    );
  };
  

  return (
    <div id='panel'>
      <Toast ref={toast} />
      <div  className="card-container">
        <div className='card'>
        <h5>Agendar Nueva Cita</h5>
        <div className="formgrid grid">
          {/* Profesional */}
          <div className="field col-12 md:col-6">
            <label htmlFor="idprofesional">Profesional *</label>
            <Dropdown
              id="idprofesional"
              value={cita.idprofesional}
              options={profesionales}
              onChange={(e) => handleChange(e, 'idprofesional')}
              placeholder="Seleccione un profesional"
              className="w-full"
            />
          </div>

          {/* Paciente */}
          <div className="field col-12 md:col-6">
            <label htmlFor="paciente">Paciente *</label>
            <div className="p-inputgroup">
              <InputText
                id="paciente"
                value={selectedPaciente ? ` ${selectedPaciente.idpaciente}-${selectedPaciente.nombre} ${selectedPaciente.apellido}` : ''}
                readOnly
                placeholder="Seleccione un paciente"
                className="w-full"
              />
              <Button icon="pi pi-search" onClick={showDialog} />
            </div>
          </div>

          {/* Usuario */}
          <div className="field col-12 md:col-6">
            <label htmlFor="idusuario">Usuario</label>
            <InputText
              id="idusuario"
              value={usuarios}
              disabled
              className="w-full"
            />
          </div>

          {/* Estado de la Consulta */}
          <div className="field col-12 md:col-6">
            <label htmlFor="idestadoconsulta">Estado de la Consulta</label>
            <Dropdown
              id="idestadoconsulta"
              value={cita.idestadoconsulta}
              options={estadosConsulta}
              onChange={(e) => handleChange(e, 'idestadoconsulta')}
              placeholder="Seleccione un estado"
              className="w-full"
            />
          </div>

          {/* Fecha */}
          <div className="field col-12 md:col-6">
            <label htmlFor="fecha">Fecha *</label>
            <PrimeCalendar
              id="fecha"
              value={cita.fecha}
              onChange={(e) => handleChange(e, 'fecha')}
              dateFormat="dd/mm/yy"
              placeholder="Seleccione una fecha"
              showIcon
              locale="es"
              className="w-full"
            />
          </div>

          {/* Hora */}
          <div className="field col-12 md:col-6">
            <label htmlFor="hora">Hora *</label>
            <PrimeCalendar
              id="hora"
              value={cita.hora}
              onChange={(e) => handleChange(e, 'hora')}
              timeOnly
              hourFormat="24"
              placeholder="Seleccione una hora"
              showIcon
              className="w-full"
            />
          </div>

          {/* Observación */}
          <div className="field col-12">
            <label htmlFor="observacion">Observación</label>
            <InputTextarea
              id="observacion"
              value={cita.observacion}
              onChange={(e) => handleChange(e, 'observacion')}
              rows={3}
              autoResize
              className="w-full"
            />
          </div>

          {/* Botón Guardar */}
          <div className="field col-12">
            <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} className="w-full" />
          </div>
        </div>
        </div>
      </div>

      {/* Diálogo de Selección de Paciente */}
      <Dialog
        header="Seleccionar Paciente"
        visible={displayDialog}
        style={{ width: '50vw' }}
        modal
        onHide={hideDialog}
      >
        <DataTable
          value={pacientes}
          paginator
          rows={5}
          selectionMode="single"
          selection={selectedPaciente}
          onSelectionChange={(e) => onPacienteSelect(e.value)}
          dataKey="idpaciente"
          globalFilter={globalFilter}
          header={renderHeader()}
        >
          <Column field="idpaciente" header="ID" sortable />
          <Column field="nombre" header="Nombre" sortable />
          <Column field="apellido" header="Apellido" sortable />
          <Column field="cedula" header="Cedula" sortable />
          {/* Agrega más columnas si es necesario */}
        </DataTable>
      </Dialog>
    </div>
  );
};

export default CitaForm;



