import React, { useState } from 'react';
import './App.css';
import CVUploadForm from './components/CVUploadForm';
import LoginForm from './components/LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>CV Upload Portal</h1>
      {!isLoggedIn ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <CVUploadForm />
      )}
    </div>
  );
}

export default App;
