import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import axiosInstance from '../../API/apiConfig';

const HistoriaMedicaForm = ({ pacienteSeleccionado, onSave }) => {
    const [historiaMedica, setHistoriaMedica] = useState({
        gastritis: 'NO',
        hipertencion: 'NO',
        coagulacion: 'NO',
        diabetes: 'NO',
        hepatitis: 'NO',
        asma: 'NO',
        enfermedadescardiacas: 'NO',
        protesiscardiaca: 'NO',
        disturbiospsiquicos: 'NO',
        tra_cabeza_cuello: 'NO',
        desmayo: 'NO',
        epilepsia: 'NO',
        anemia: 'NO',
        hemofilia: 'NO',
        tuberculosis: 'NO',
        sinusitis: 'NO',
        vih: 'NO',
        ets: 'NO',
        cancer: 'NO',
        quirurgico: '',
        medicacion: '',
        embarazo: '',
        meses: '',
        otros: '',
        observacion: '',
        alergias: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);

    const options = [
        { label: 'SI', value: 'SI' },
        { label: 'NO', value: 'NO' }
    ];
    const handleInputChange = (e, field) => {
      const value = e.target.value.toUpperCase(); // Convertir a mayúsculas
      setHistoriaMedica((prev) => ({ ...prev, [field]: value }));
  };
  

    useEffect(() => {
        const fetchHistoriaMedica = async () => {
            if (pacienteSeleccionado?.idpaciente) {
                try {
                  console.log(pacienteSeleccionado.idpaciente)
                    const response = await axiosInstance.get(`/ficha/${pacienteSeleccionado.idpaciente}`);
                    if (response.data) {
                        setHistoriaMedica(response.data);
                        setIsEditMode(true);
                    } else {
                        setIsEditMode(false);
                    }
                } catch (error) {
                    console.error('Error al consultar el historial médico:', error);
                }
            }
        };
        fetchHistoriaMedica();
    }, [pacienteSeleccionado]);

  

    const handleSave = async () => {
        try {
            if (isEditMode) {
                await axiosInstance.put(`/ficha/${historiaMedica.idhistoria_medica}`, historiaMedica);
                alert('Historial médico actualizado con éxito');
                limpiar()
            } else {
                await axiosInstance.post('/ficha', {
                    ...historiaMedica,
                    idpaciente: pacienteSeleccionado.idpaciente
                });
                alert('Historial médico guardado con éxito');
                limpiar()
            }
            if (onSave) onSave();
        } catch (error) {
            console.error('Error al guardar el historial médico:', error);
            alert('Ocurrió un error al guardar el historial médico.');
        }
    };
function limpiar(){
    // Restablecer los campos del formulario
    setHistoriaMedica({
      gastritis: 'NO',
      hipertencion: 'NO',
      coagulacion: 'NO',
      diabetes: 'NO',
      hepatitis: 'NO',
      asma: 'NO',
      enfermedadescardiacas: 'NO',
      protesiscardiaca: 'NO',
      disturbiospsiquicos: 'NO',
      tra_cabeza_cuello: 'NO',
      desmayo: 'NO',
      epilepsia: 'NO',
      anemia: 'NO',
      hemofilia: 'NO',
      tuberculosis: 'NO',
      sinusitis: 'NO',
      vih: 'NO',
      ets: 'NO',
      cancer: 'NO',
      quirurgico: '',
      medicacion: '',
      embarazo: '',
      meses: '',
      otros: '',
      observacion: '',
      alergias: ''
  });
}
    return (
        <Card title="Historial Médico">
            {/* Datos del paciente */}
            <div className="field grid">
                <div className="p-col-12 md:col-4">
                    <label>Código del Paciente</label>
                    <InputText value={pacienteSeleccionado?.idpaciente || ''} readOnly />
                </div>
                <div className="p-col-12 md:col-4">
                    <label>Nombre</label>
                    <InputText value={pacienteSeleccionado?.nombre || ''} readOnly />
                </div>
                <div className="p-col-12 md:col-4">
                    <label>Apellido</label>
                    <InputText value={pacienteSeleccionado?.apellido || ''} readOnly />
                </div>
            </div>

            {/* Campos de historial médico */}
            <div className="field grid">
                {[
                    'gastritis',
                    'hipertencion',
                    'coagulacion',
                    'diabetes',
                    'hepatitis',
                    'asma',
                    'enfermedadescardiacas',
                    'protesiscardiaca',
                    'disturbiospsiquicos',
                    'tra_cabeza_cuello',
                    'desmayo',
                    'epilepsia',
                    'anemia',
                    'hemofilia',
                    'tuberculosis',
                    'sinusitis',
                    'vih',
                    'ets',
                    'cancer'
                ].map((field) => (
                    <div className="p-col-12 md:col-2" key={field}>
                        <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <Dropdown
                            id={field}
                            value={historiaMedica[field]}
                            options={options}
                            onChange={(e) => handleInputChange(e, field)}
                        />
                    </div>
                ))}
            </div>

            {/* Campos adicionales */}
            <div className="field grid">
                <div className="p-col-12 md:col-6">
                    <label htmlFor="quirurgico">Quirúrgico</label>
                    <InputText
                        id="quirurgico"
                        value={historiaMedica.quirurgico}
                        onChange={(e) => handleInputChange(e, 'quirurgico')}
                    />
                </div>
                <div className="p-col-12 md:col-6">
                    <label htmlFor="medicacion">Medicación</label>
                    <InputText
                        id="medicacion"
                        value={historiaMedica.medicacion}
                        onChange={(e) => handleInputChange(e, 'medicacion')}
                    />
                </div>
                <div className="p-col-12 md:col-6">
                    <label htmlFor="embarazo">Embarazo</label>
                    <InputText
                        id="embarazo"
                        value={historiaMedica.embarazo}
                        onChange={(e) => handleInputChange(e, 'embarazo')}
                    />
                </div>
                <div className="p-col-12 md:col-6">
                    <label htmlFor="meses">Meses</label>
                    <InputText
                        id="meses"
                        value={historiaMedica.meses}
                        onChange={(e) => handleInputChange(e, 'meses')}
                    />
                </div>
                <div className="p-col-12  md:col-4">
                    <label htmlFor="otros">Otros</label>
                    <InputText
                        id="otros"
                        value={historiaMedica.otros}
                        onChange={(e) => handleInputChange(e, 'otros')}
                    />
                </div>
                <div className="p-col-12  md:col-4">
                    <label htmlFor="observacion">Observación</label>
                    <InputText
                        id="observacion"
                        value={historiaMedica.observacion}
                        onChange={(e) => handleInputChange(e, 'observacion')}
                    />
                </div>
                <div className="p-col-12  md:col-4">
                    <label htmlFor="alergias">Alergias</label>
                    <InputText
                        id="alergias"
                        value={historiaMedica.alergias}
                        onChange={(e) => handleInputChange(e, 'alergias')}
                    />
                </div>
            </div>

            {/* Botones */}
            <div className="field grid">
                <div className="p-col-12 md:col-6">
                    <Button label="Guardar" icon="pi pi-save" onClick={handleSave} />
                </div>
                <div className="p-col-12 md:col-6">
                    <Button label="Cancelar" icon="pi pi-times" onClick={limpiar} className="p-button-secondary" />
                </div>
            </div>
        </Card>
    );
};

export default HistoriaMedicaForm;
