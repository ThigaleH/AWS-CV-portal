import React from 'react';

function PasswordStrength({ password }) {
  const getStrength = () => {
    if (password.length < 6) return 'Weak';
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) return 'Strong';
    return 'Medium';
  };

  return <div>Password Strength: {getStrength()}</div>;
}

export default PasswordStrength;
