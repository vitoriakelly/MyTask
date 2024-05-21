import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Singup.css';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !password.trim()) {
      alert("Todos os campos devem ser preenchidos!")
      return;
    }
    const user = { name, username, password };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/my-list');
  };

  return (
    <div className="container"> {}
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Signup;
