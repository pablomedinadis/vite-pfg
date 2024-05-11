import { useEffect, useState } from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';

export function AccessCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:1234/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return [];
        }
    };

    const checkCredentials = (users, email, password) => {
        let isAuthenticated = false;
      
        for (let user of users) {
          if (user.User_email === email && user.User_password === password) {
            isAuthenticated = true;
            break;
          }
        }
      
        return isAuthenticated;
      }

    const redirect = async () => {
        navigate('/register')
    }

    const handleLogin = async () => {
        const users = await fetchUsers();
        const user = users.find(u => u.User_email === email && u.User_password === password);
        console.log(users)
        const userIsAuthenticated = checkCredentials(users, email, password);
        console.log(userIsAuthenticated)
        if (userIsAuthenticated) {
            console.log('Usuario autenticado exitosamente:', email);
        } else {
            console.log('Credenciales incorrectas');
            // Mostrar un mensaje de error o manejar el fallo de autenticación
        }
    };

    const handleForgotPassword = () => {
        console.log('Procedimiento para recuperar contraseña');
        // Implementar lógica de recuperación de contraseña
    };

    return (
        <div className='Access-Main'>
        <article className="Access-Card">
            <img className="Access-Card-Img" src="src/assets/logo.png" alt="MainLogo" />
            <h1 className="Access-Card-Title">¿Estás de vuelta?</h1>
            <p className="Access-Card-SecondTitle">Accede con tu Mail</p>
            <div className="Access-Card-InputContainer">
                <input className="Access-Card-Input" type="text" placeholder="Mail" value={email} onChange={handleEmailChange} />
                <input className="Access-Card-Input" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            </div>
            <button className="Access-Card-Btn-Access" onClick={handleLogin}>Iniciar sesión</button>
            <button className="Access-Card-Btn-Pwd" onClick={handleForgotPassword}>¿Olvidaste la contraseña?</button>
            <button className="Access-Card-Btn-Pwd" onClick={redirect}>Regístrate</button>
            <p className="Access-Card-Terms">Al pulsar 'Iniciar Sesión' acepta los términos de servicio y privacidad</p>
        </article>
        </div>
    );
}
