import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, GraduationCap, Users, UserPlus } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/course-types', label: 'Course Types', icon: BookOpen },
    { path: '/courses', label: 'Courses', icon: GraduationCap },
    { path: '/course-offerings', label: 'Course Offerings', icon: Users },
    { path: '/student-registrations', label: 'Student Registrations', icon: UserPlus },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>Student Registration System</h1>
        </div>
        <ul className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 