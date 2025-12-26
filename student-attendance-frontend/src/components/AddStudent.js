import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post('/students', {
      fullName,
      rollNo,
      className,
      section
    });

    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'crimson', textAlign: 'center' }}>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        /><br /><br />

        <input
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        /><br /><br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddStudent;
