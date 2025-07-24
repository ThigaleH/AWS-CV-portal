import React, { useState } from 'react';
import './LoginForm.css'; // Optional: for styling

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const validatePassword = (pwd) => {
    let strength = '';
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) {
      strength = 'Strong';
    } else if (pwd.length >= 6) {
      strength = 'Medium';
    } else {
      strength = 'Weak';
    }
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      alert('Login successful!');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} aria-label="Login Form">
        <h2>Login</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
          aria-required="true"
        />
        <p className={`strength ${passwordStrength.toLowerCase()}`}>Password Strength: {passwordStrength}</p>

        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          /> Remember me
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p><a href="/forgot-password">Forgot password?</a></p>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
