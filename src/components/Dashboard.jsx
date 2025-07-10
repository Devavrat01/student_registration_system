import { Users, BookOpen, GraduationCap, UserPlus } from 'lucide-react';

const Dashboard = ({ courseTypes, courses, courseOfferings, studentRegistrations }) => {
  const stats = [
    {
      title: 'Course Types',
      count: courseTypes.length,
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Courses',
      count: courses.length,
      icon: GraduationCap,
      color: 'green'
    },
    {
      title: 'Course Offerings',
      count: courseOfferings.length,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Student Registrations',
      count: studentRegistrations.length,
      icon: UserPlus,
      color: 'orange'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Student Registration System</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">
                <Icon size={32} />
              </div>
              <div className="stat-content">
                <h3>{stat.count}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h2>Recent Course Types</h2>
          <div className="list-container">
            {courseTypes.slice(0, 5).map((type) => (
              <div key={type.id} className="list-item">
                <span>{type.name}</span>
              </div>
            ))}
            {courseTypes.length === 0 && (
              <p className="empty-state">No course types created yet</p>
            )}
          </div>
        </div>

        <div className="section">
          <h2>Recent Courses</h2>
          <div className="list-container">
            {courses.slice(0, 5).map((course) => (
              <div key={course.id} className="list-item">
                <span>{course.name}</span>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="empty-state">No courses created yet</p>
            )}
          </div>
        </div>

        <div className="section">
          <h2>Recent Course Offerings</h2>
          <div className="list-container">
            {courseOfferings.slice(0, 5).map((offering) => (
              <div key={offering.id} className="list-item">
                <span>{offering.name}</span>
              </div>
            ))}
            {courseOfferings.length === 0 && (
              <p className="empty-state">No course offerings created yet</p>
            )}
          </div>
        </div>

        <div className="section">
          <h2>Recent Student Registrations</h2>
          <div className="list-container">
            {studentRegistrations.slice(0, 5).map((registration) => (
              <div key={registration.id} className="list-item">
                <span>{registration.studentName} - {registration.courseOfferingName}</span>
              </div>
            ))}
            {studentRegistrations.length === 0 && (
              <p className="empty-state">No student registrations yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 