import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent() {
  const { id } = useParams();

  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`);

        setFullName(res.data.full_name);
        setRollNo(res.data.roll_number);
        setClassName(res.data.class);
        setSection(res.data.section);
      } catch (err) {
        console.error('Error fetching student:', err);
        alert('Failed to fetch student data.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/students/${id}`, {
        fullName,
        rollNo,
        className,
        section
      });
      alert('Student updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating student:', err);
      alert('Failed to update student.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading student data...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'crimson', textAlign: 'center' }}>Edit Student</h2>

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

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
