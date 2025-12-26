import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#333', padding: '1rem', marginBottom: '2rem' }}>
      <Link to="/" style={linkStyle}>Students</Link> {' | '}
      <Link to="/add-student" style={linkStyle}>Add Student</Link> {' | '}
      <Link to="/attendance" style={linkStyle}>Attendance</Link>
    </nav>
  );
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  margin: '0 15px',
  fontSize: '18px'
};

export default Navbar;
