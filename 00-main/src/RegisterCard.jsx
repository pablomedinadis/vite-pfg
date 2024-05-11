import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

export function RegisterCard() {
    // State for each input
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()  

    // Handlers for each input
    const handleChange = (setter) => (event) => setter(event.target.value);

    const redirectLogin = async () => {
        navigate('/login')
    }

    // Handle form submission
    const handleSubmit = async () => {
        const userData = { name, surname, email, password, phone_number: phone };
        console.log(userData)
        try {
            const response = await fetch('http://localhost:1234/users/CreateUsers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            console.log(response)
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                console.log('User registered successfully:', data);
                // Additional logic after successful registration
            } else {
                throw new Error(data.message || 'Failed to register');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            console.log("Error")
        }
    };

    return (
        <article className='Access-Card'>
            <img className="Access-Card-Img" src="src/assets/logo.png" alt="Logo" />
            <h1 className='Access-Card-Title'>Crea tu cuenta</h1>
            <p className='Access-Card-SecondTitle'>Completa los siguientes campos para crear una cuenta</p>
            <div>
                <input className="Access-Card-Input" type="text" placeholder='Nombre' value={name} onChange={handleChange(setName)} />
                <input className="Access-Card-Input" type="text" placeholder='Apellido' value={surname} onChange={handleChange(setSurname)} />
                <input className="Access-Card-Input" type="text" placeholder='Teléfono' value={phone} onChange={handleChange(setPhone)} />
                <input className="Access-Card-Input" type="text" placeholder='Mail' value={email} onChange={handleChange(setEmail)} />
                <input className="Access-Card-Input" type="password" placeholder='Password' value={password} onChange={handleChange(setPassword)} />
            </div>
            <button className="Access-Card-Btn-Access" onClick={handleSubmit}>Registrarse</button>
            <button className="Access-Card-Btn-Pwd" onClick={redirectLogin}>Ya me he registrado</button>
            <p className="Access-Card-Terms">Al pulsar 'Registrarse' acepta los términos de servicio y privacidad</p>
        </article>
    );
}
