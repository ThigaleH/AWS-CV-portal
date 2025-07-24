import React, { useState } from 'react';

const CandidateList = ({ candidates }) => {
  const [searchSkill, setSearchSkill] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.skills.toLowerCase().includes(searchSkill.toLowerCase()) &&
    candidate.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div>
      <h2>Candidate List</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by skill"
          value={searchSkill}
          onChange={(e) => setSearchSkill(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{ marginLeft: '1rem' }}
        />
      </div>

      {filteredCandidates.length > 0 ? (
        <ul>
          {filteredCandidates.map((candidate, index) => (
            <li key={index} style={{ marginBottom: '1rem' }}>
              <strong>Name:</strong> {candidate.name}<br />
              <strong>Skills:</strong> {candidate.skills}<br />
              <strong>Experience:</strong> {candidate.experience} years<br />
              <strong>Location:</strong> {candidate.location}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching candidates found.</p>
      )}
    </div>
  );
};

export default CandidateList;
