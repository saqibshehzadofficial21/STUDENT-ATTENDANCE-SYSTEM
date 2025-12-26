const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_attendance_tracker'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected');
});

// Paste all your /students and /attendance endpoints here

app.listen(5000, () => console.log('Server running on port 5000'));
