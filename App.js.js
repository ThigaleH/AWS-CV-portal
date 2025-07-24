import React from 'react';
import './App.css';
import CVUploadForm from './components/CVUploadForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="App">
      <h1>CV Upload Portal</h1>
      <LoginForm />
      <CVUploadForm />
    </div>
  );
}

export default App;
