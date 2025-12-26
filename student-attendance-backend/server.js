// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student_attendance_tracker'
});

db.connect(err => {
  if (err) {
    console.log("MySQL Error: ", err);
    return;
  }
  console.log('MySQL Connected');
});

// ====================================================
// GET ALL STUDENTS
app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD STUDENT
app.post('/api/students', (req, res) => {
  const { fullName, rollNo, className, section } = req.body;

  const sql = `
    INSERT INTO students (full_name, roll_number, \`class\`, section)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [fullName, rollNo, className, section], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ student_id: result.insertId, ...req.body });
  });
});

// Get single student by ID ✅ must be above PUT/DELETE
app.get('/api/students/:id', (req, res) => {
  const sql = 'SELECT * FROM students WHERE student_id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Student not found" });
    res.json(results[0]);
  });
});
// UPDATE STUDENT
app.put('/api/students/:id', (req, res) => {
  const { fullName, rollNo, className, section } = req.body;

  const sql = `
    UPDATE students
    SET full_name = ?, roll_number = ?, \`class\` = ?, section = ?
    WHERE student_id = ?
  `;

  db.query(sql, [fullName, rollNo, className, section, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Updated successfully" });
  });
});

// DELETE STUDENT
app.delete('/api/students/:id', (req, res) => {
  const studentId = Number(req.params.id); // Ensure it's a number

  if (!studentId) return res.status(400).json({ message: "Invalid student ID" });

  const sql = 'DELETE FROM students WHERE student_id = ?';

  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Deleted successfully" });
  });
});


// MARK ATTENDANCE
app.post('/api/attendance', (req, res) => {
  const { studentId, date, status } = req.body;

  const sql = `
    INSERT INTO attendance (student_id, date, status)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [studentId, date, status], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Attendance marked" });
  });
});



// START SERVER
app.listen(5000, () => console.log("Server running on port 5000"));
