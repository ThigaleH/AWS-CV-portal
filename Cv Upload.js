// src/components/CVUploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function CVUploadForm() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [parsedData, setParsedData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('cv', file);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('http://localhost:5000/upload', formData);
      setParsedData(response.data);
      setUploadStatus('Upload and parsing successful!');
    } catch (error) {
      console.error(error);
      setUploadStatus('Upload failed.');
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Upload Your CV</h2>
      <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} />
      <button onClick={handleUpload} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
      <p className="mt-2 text-sm text-gray-700">{uploadStatus}</p>

      {parsedData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Parsed Information</h3>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(parsedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
