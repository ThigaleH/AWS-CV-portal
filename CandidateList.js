import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateManager = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({ name: '', skills: '', experience: '', location: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = 'http://localhost:5000/api/candidates'; // Adjust if hosted elsewhere

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(API_URL);
      setCandidates(res.data);
    } catch (err) {
      setError('Error loading candidates.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, experience: Number(formData.experience) };

    try {
      if (editId) {
        // Update candidate
        await axios.put(`${API_URL}/${editId}`, payload);
        setSuccess('Candidate updated successfully.');
      } else {
        // Add new candidate
        await axios.post(API_URL, payload);
        setSuccess('Candidate added successfully.');
      }
      fetchCandidates();
      resetForm();
    } catch (err) {
      setError('Error saving candidate.');
    }
  };

  const handleEdit = (candidate) => {
    setFormData(candidate);
    setEditId(candidate.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setSuccess('Candidate deleted successfully.');
      fetchCandidates();
    } catch (err) {
      setError('Error deleting candidate.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', skills: '', experience: '', location: '' });
    setEditId(null);
    setError('');
    setSuccess('');
  };

  return (
    <div>
      <h2>{editId ? 'Edit Candidate' : 'Add Candidate'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" required />
        <input name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="Experience" required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
        {editId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <h2>Candidate List</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <strong>{candidate.name}</strong> - {candidate.skills} ({candidate.experience} yrs) - {candidate.location}
            <div>
              <button onClick={() => handleEdit(candidate)}>Edit</button>
              <button onClick={() => handleDelete(candidate.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateManager;
