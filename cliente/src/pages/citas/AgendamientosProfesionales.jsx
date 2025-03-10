import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axiosInstance from '../../API/apiConfig';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { format } from 'date-fns';
import { Button } from 'primereact/button';
import { addLocale } from 'primereact/api'; // Asegúrate de importar addLocale
import '../../assets/styles/agendamiento.css';

// Configura el locale fuera del componente
addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy',
    clear: 'Limpiar'
});

const AgendamientosProfesionales = () => {
    const [citas, setCitas] = useState([]); // Almacenar citas
    const [globalFilter, setGlobalFilter] = useState(null); // Filtro global
    const [selectedProfessional, setSelectedProfessional] = useState(null); // Profesional seleccionado
    const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada
    const [profesionales, setProfesionales] = useState([]); // Lista de profesionales

    // useRef para prevenir actualizaciones innecesarias
    const firstRender = useRef(true);

    useEffect(() => {
        fetchProfesionales(); // Solo se ejecuta al montar el componente
    }, []); 

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
        } else {
            if (selectedProfessional || selectedDate) {
                fetchCitas(selectedProfessional, selectedDate);
            }
        }
    }, [selectedProfessional, selectedDate]);

    const fetchProfesionales = async () => {
        try {
            const response = await axiosInstance.get('profesional');
            const profesionalesOptions = transformarDatosDropdown(response.data, 'idprofesional', 'nombre');
            setProfesionales(profesionalesOptions);
        } catch (error) {
            console.error('Error al cargar profesionales:', error);
        }
    };

    const fetchCitas = async (idProfesional, fecha) => {
        const data = {};

        if (idProfesional) {
            data.idprofesional = idProfesional;
        }

        if (fecha) {
            data.fecha = format(fecha, 'yyyy-MM-dd');
        }

        try {
            const response = await axiosInstance.post('/agendamiento/agenda', data);
            if (JSON.stringify(response.data) !== JSON.stringify(citas)) {
                setCitas(response.data);
            }
        } catch (error) {
            console.error('Error al cargar las citas:', error);
        }
    };

    const transformarDatosDropdown = (data, valueField, labelField) => {
        return data.map((item) => ({
            label: item[labelField],
            value: item[valueField],
        }));
    };

    const confirmarCita = async (citaId) => {
        try {
            await axiosInstance.put(`/agendamiento/agenda/${citaId}`, { estado: 'CONFIRMADO' });
            fetchCitas(selectedProfessional, selectedDate);
        } catch (error) {
            console.error('Error al confirmar la cita:', error);
        }
    };

    const cancelarCita = async (citaId) => {
        try {
            await axiosInstance.put(`/agendamiento/cancelar/${citaId}`, { estado: 'CANCELADO' });
            fetchCitas(selectedProfessional, selectedDate);
        } catch (error) {
            console.error('Error al cancelar la cita:', error);
        }
    };

    // Función para generar y descargar el PDF
    const generarPDF = async () => {
        try {
            const response = await axiosInstance.post('/agendamiento/informe', {
                idprofesional: selectedProfessional,
                fecha: format(selectedDate, 'yyyy-MM-dd'),
            }, {
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    };

    const actionTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button
                    id='botones'
                    icon="pi pi-check"
                    className="p-button-rounded p-button-success"
                    onClick={() => confirmarCita(rowData.idcitas)}
                />
                <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger"
                    onClick={() => cancelarCita(rowData.idcitas)}
                />
            </div>
        );
    };

    return (
        <div className="agendamientos-profesionales">
            <div className="field grid">
                <div id='campos' className="field col-6 md:col-8">
                    <Dropdown
                        value={selectedProfessional}
                        options={profesionales}
                        onChange={(e) => setSelectedProfessional(e.value)}
                        placeholder="Seleccione un profesional"
                        showClear
                        className="w-full"
                    />
                </div>
                <div id='campos' className="field col-6 md:col-4">
                    <Calendar
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.value)}
                        dateFormat="dd/mm/yy"
                        placeholder="Seleccione una fecha"
                        showIcon
                        className="w-full"
                        locale="es"   // Usamos el locale que agregamos
                    />
                </div>
                <div className="field col-6 md:col-8">
                    <span className="p-input-icon-left w-full">
                        <InputText
                            type="search"
                            onInput={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Buscar..."
                            className="w-full"
                        />
                    </span>
                </div>
                <div className="field col-6 md:col-4">
                    <Button
                        label="Generar Reporte PDF"
                        icon="pi pi-file-pdf"
                        onClick={generarPDF}
                        className="p-button-danger"
                    />
                </div>
            </div>

            <DataTable
                value={citas}
                paginator
                rows={10}
                globalFilter={globalFilter}
                emptyMessage="No se encontraron citas."
                className="p-datatable-responsive"
            >
                <Column field="idcitas" header="ID" />
                <Column field="profesional" header="Profesional" />
                <Column field="telefono" header="Teléfono" />
                <Column field="paciente" header="Paciente" />
                <Column
                    field="fecha"
                    header="Fecha"
                    body={(rowData) => format(new Date(rowData.fecha), 'dd/MM/yyyy')}
                />
                <Column field="hora" header="Hora" sortable />
                <Column field="descripcion" header="Estado" />
                <Column header="Acciones" body={actionTemplate} />
            </DataTable>
        </div>
    );
};

export default AgendamientosProfesionales;
