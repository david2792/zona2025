import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

const CategoriaForm = ({
  onSave,
  onCancel,
  descripcion, 
  setDescripcion,
}) => {
  const toast = useRef(null);

  const EnviarDatos = (e) => {
    e.preventDefault();
    if (!descripcion) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'La descripción es obligatoria', life: 3000 });
      return;
  }
    console.log(setDescripcion)
    const categoriaData = {
      descripcion: descripcion.toUpperCase()
    };
   
    onSave(categoriaData);

    // Muestra un mensaje de éxito
    toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Categoría guardada con éxito', life: 3000 });
  };

  return (
    <Card title="Registrar Categoría" className="register-card">
      <Toast ref={toast} />
      <form onSubmit={EnviarDatos} className="p-fluid">
        <div className="field grid">
          <div className="field col-12 md:col-6">
            <label htmlFor="descripcion">Descripción</label>
            <InputText
              autoComplete="off"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field grid">
          <div className="field col-12 md:col-6">
            <Button label="Guardar" icon="pi pi-save" type="submit" className="p-button-success" />
          </div>
          <div className="field col-12 md:col-6">
            <Button label="Cancelar" icon="pi pi-exclamation-circle" type="button" className="p-button-warning" onClick={onCancel} />
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CategoriaForm;
