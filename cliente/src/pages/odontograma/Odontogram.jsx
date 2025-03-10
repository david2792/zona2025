import React, { useState } from 'react';
import './Odontogram.css';
import Teeth from './Teeth';
import axios from 'axios';

function Odontogram() {
  const [odontogramState, setOdontogramState] = useState({});
  const [observations, setObservations] = useState("");
  const handleToothUpdate = (id, toothState) => {
    setOdontogramState((prevState) => ({
      ...prevState,
      [id]: toothState,
    }));
  };

  const saveOdontogram = async () => {
    const dataToSend = {
      teeth: Object.entries(odontogramState).map(([toothNumber, diagnostics]) => ({
        toothNumber: parseInt(toothNumber, 10),
        diagnostics
      })),
      observations,
    };

    const odontogramJson = JSON.stringify(dataToSend, null, 2);
    console.log("Odontogram JSON:", odontogramJson);

    // Aquí puedes enviar el JSON a tu backend si es necesario
  };


  return (
    <div className="OdontogramContainer">
      <div className="Odontogram">
        <svg version="1.1" height="80%" width="80%">
          <Teeth start={18} end={11} x={0} y={0} handleChange={handleToothUpdate} />
          <Teeth start={21} end={28} x={240} y={0} handleChange={handleToothUpdate} />
          <Teeth start={55} end={51} x={75} y={60} handleChange={handleToothUpdate} />
          <Teeth start={61} end={65} x={240} y={60} handleChange={handleToothUpdate} />
          <Teeth start={85} end={81} x={75} y={120} handleChange={handleToothUpdate} />
          <Teeth start={71} end={75} x={240} y={120} handleChange={handleToothUpdate} />
          <Teeth start={48} end={41} x={0} y={180} handleChange={handleToothUpdate} />
          <Teeth start={31} end={38} x={240} y={180} handleChange={handleToothUpdate} />
        </svg>
      </div>
      <div className="Observations">
        <textarea
        value={observations}
          onChange={(e) => setObservations(e.target.value)}
          placeholder="Escribe observaciones aquí"
        ></textarea>
         <button onClick={saveOdontogram}>Guardar Odontograma</button>
      </div>
    </div>
  );
}

export default Odontogram;
