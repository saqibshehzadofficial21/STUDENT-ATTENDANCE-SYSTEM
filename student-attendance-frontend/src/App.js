import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Students from './components/Students';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import Attendance from './components/Attendance';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
}

export default App;