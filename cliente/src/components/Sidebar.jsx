import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
        
const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            command: () => {  navigate('/inicio') }
        },
        {
            label: 'Profesional',
            icon: 'pi pi-fw pi-chart-bar',
            command: () => { navigate('/profesional') }
        },
        {
            label: 'Pacientes',
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                    label: 'Registrar',
                    icon: 'pi pi-fw pi-user',
                    command: () => { navigate('/paciente') }
                },
                {
                    label: 'Historial Medico',
                    icon: 'pi pi-fw pi-sign-out',
                    command: handleLogout
                },
                {
                    label: 'Historial Odontologico',
                    icon: 'pi pi-fw pi-sign-out',
                    command: handleLogout
                },
                {
                    label: 'Odontograma',
                    icon: 'pi pi-fw pi-sign-out',
                    command: () => { navigate('/odontograma') }
                }
            ]
        },
        {
            label: 'Mantenimiento',
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                    label: 'Categoria',
                    icon: 'pi pi-fw pi-user',
                    command: () => { navigate('/categoria') }
                },
                {
                    label: 'Trataniento',
                    icon: 'pi pi-fw pi-user',
                    command: () => { navigate('/tratamiento') }
                }
            ]
        },
        {
            label: 'Sistema',
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                    label: 'Ayuda',
                    icon: 'pi pi-fw pi-user',
                    command: () => { window.location.hash = "/profile"; }
                },
                {
                    label: 'Cerrar Sesion',
                    icon: 'pi pi-fw pi-sign-out',
                    command: handleLogout
                }
            ]
        }
    ];
 
    return (
        <div>
            <Menubar model={items} />

        </div>
    );
}

export default Sidebar;
