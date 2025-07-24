import React, { useState } from 'react';
import PasswordStrength from './PasswordStrength';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form validation and API call here
    alert('Login Submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <PasswordStrength password={password} />
      <label>
        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
        Remember me
      </label>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;