import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function Students() {
  const [students, setStudents] = useState([]);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
      alert('Failed to fetch students.');
    }
  };

const deleteStudent = async (id) => {
  if (!window.confirm('Are you sure you want to delete this student?')) return;

  try {
    const res = await api.delete(`/students/${id}`);
    alert(res.data.message); // Shows message from backend
    fetchStudents();         // Refresh the student list
  } catch (err) {
    console.error('Error deleting student:', err);
    alert(err.response?.data?.message || 'Failed to delete student.');
  }
};

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'crimson', textAlign: 'center' }}>Students</h2>

      <Link to="/add-student">Add Student</Link>

      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: '10px', width: '100%', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Section</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No students found.</td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.student_id}>
                <td>{s.student_id}</td>
                <td>{s.full_name}</td>
                <td>{s.roll_number}</td>
                <td>{s.class}</td>
                <td>{s.section}</td>
                <td>
                  <Link to={`/edit-student/${s.student_id}`}>Edit</Link>
                  <button
                    onClick={() => deleteStudent(s.student_id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
