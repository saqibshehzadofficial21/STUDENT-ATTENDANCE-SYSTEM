import { useState, useEffect } from 'react';
import api from '../api';

function Attendance() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [attendance, setAttendance] = useState({});

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/students');
        setStudents(res.data);

        // Initialize attendance as "Present" for all students
        const initAttendance = {};
        res.data.forEach(s => initAttendance[s.student_id] = 'Present');
        setAttendance(initAttendance);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
  }, []);

  // Handle attendance change
  const handleChange = (student_id, value) => {
    setAttendance(prev => ({ ...prev, [student_id]: value }));
  };

  // Submit attendance
  const handleSubmit = async () => {
    try {
      const promises = Object.keys(attendance).map(student_id =>
        api.post('/attendance', {
          studentId: student_id, // matches backend
          date,
          status: attendance[student_id]
        })
      );

      await Promise.all(promises);
      alert('Attendance marked successfully!');
    } catch (err) {
      console.error('Error marking attendance:', err);
      alert('Failed to mark attendance.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'crimson', textAlign: 'center' }}>Mark Attendance</h2>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      /><br /><br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.student_id}>
              <td>{s.full_name}</td>
              <td>
                <select
                  value={attendance[s.student_id]}
                  onChange={e => handleChange(s.student_id, e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table><br />

      <button onClick={handleSubmit}>Submit Attendance</button>
    </div>
  );
}

export default Attendance;
