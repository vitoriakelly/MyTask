import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!username.trim() || !password.trim()) {
            alert("Todos os campos devem ser preenchidos!")
            return;
        }
        if(storedUser && storedUser.username === username && storedUser.password === password) {
            alert('Login efetuado');
            navigate('/home');
        } else {
            alert('Credenciais Invalidas');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            
            <div className="link">
                <p>Cadastre-se <Link to="/signup">Sing Up</Link> </p>
            </div>
        </div>
    );
}

export default Login;
