import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axiosInstance from '../API/apiConfig';
import '../assets/styles/Login.css'; // Asegúrate de tener este archivo CSS
import logo from "../assets/logo.jpg";

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const toast = useRef(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const loginData = {
            usuario,
            clave
        };

        axiosInstance.post('/usuario/login', loginData)
            .then(response => {
                const { token, tokenData } = response.data;
              
                sessionStorage.setItem('authToken', token); // Guarda el token en localStorage
                sessionStorage.setItem('idusuario', tokenData.idusuario);
                sessionStorage.setItem('nombreUsuario', tokenData.nombre);

                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Login exitoso', life: 3000 });
                navigate('/inicio'); // Redirigir al dashboard después del login
            })
            .catch(error => {
                console.error('Error al iniciar sesión:', error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Credenciales incorrectas', life: 3000 });
            });
    };

    return (
        <div className="login-container">
            <Toast ref={toast} />
            {/* Logo fuera del Card pero posicionado a la mitad */}
            
            <Card title="" className="login-card">
                <h3 id='titulo'>BIENVENIDO AL SISTEMA</h3>
                <form onSubmit={handleLogin}>
                    <div className="field">
                        <InputText 
                            placeholder='Ingrese el usuario'
                            value={usuario} 
                            onChange={(e) => setUsuario(e.target.value)} 
                            required  
                            className="text-base text-color surface-overlay border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        />
                    </div>
                    <div className="field">
                        <Password 
                            feedback={false} 
                            placeholder='Ingrese la clave'
                            value={clave} 
                            onChange={(e) => setClave(e.target.value)} 
                            required 
                            className="text-base text-color surface-overlay surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        />
                    </div>
                    <div className="field">
                        <Button label="Iniciar Sesión" icon="pi pi-sign-in" type="submit" className="p-button-success" />
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;
