import React, { useState } from 'react';

const CandidateManager = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Amit Sharma', skills: 'Python, Flask, AWS', experience: 3, location: 'Tokyo' },
    { id: 2, name: 'Rina Patel', skills: 'JavaScript, React', experience: 2, location: 'Osaka' }
  ]);

  const [formData, setFormData] = useState({ name: '', skills: '', experience: '', location: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.skills || !formData.experience || !formData.location) return;

    if (editId) {
      // Update
      setCandidates((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, ...formData } : c))
      );
      setEditId(null);
    } else {
      // Add
      const newCandidate = {
        ...formData,
        id: Date.now(),
        experience: Number(formData.experience)
      };
      setCandidates((prev) => [...prev, newCandidate]);
    }

    setFormData({ name: '', skills: '', experience: '', location: '' });
  };

  const handleEdit = (candidate) => {
    setFormData(candidate);
    setEditId(candidate.id);
  };

  const handleDelete = (id) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2>{editId ? 'Edit Candidate' : 'Add Candidate'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" required />
        <input name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="Experience" required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
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
