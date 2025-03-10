import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const CiudadForm = ({ visible, onHide, onSave }) => {
  const [descripcion, setDescripcion] = useState('');

  const handleSave = () => {
    onSave({ descripcion });
    setDescripcion('');
    onHide();
  };

  return (
    <Dialog header="Crear Nueva Ciudad" visible={visible} style={{ width: '30vw' }} onHide={onHide}>
      <div className="p-field">
        <label htmlFor="descripcion">Descripción</label>
        <InputText id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </div>
      <Button label="Guardar" icon="pi pi-check" onClick={handleSave} />
    </Dialog>
  );
};

export default CiudadForm;
