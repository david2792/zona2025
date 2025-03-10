import React, { useState, useEffect, useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import CitaForm from './CitasForm';
import AgendamientosProfesionales from './AgendamientosProfesionales';
import { Toast } from 'primereact/toast';

const ListaCitas = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef(null);

    return (
        <div className="citas-container">
            <Toast ref={toast} />
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Agendar Nueva Cita">
                    <CitaForm toast={toast} />
                </TabPanel>
                <TabPanel header="Agendamientos por Profesionales">
                    <AgendamientosProfesionales />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default ListaCitas;
