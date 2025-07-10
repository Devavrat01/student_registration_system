import { useState } from 'react';
import { Plus, Edit, Trash2, X, Check } from 'lucide-react';

const Courses = ({ courses, setCourses }) => {
  const [newCourseName, setNewCourseName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!newCourseName.trim()) {
      setError('Course name is required');
      return;
    }

    if (courses.some(course => course.name.toLowerCase() === newCourseName.toLowerCase())) {
      setError('Course with this name already exists');
      return;
    }

    const newCourse = {
      id: Date.now().toString(),
      name: newCourseName.trim()
    };

    setCourses([...courses, newCourse]);
    setNewCourseName('');
    setError('');
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setEditName(course.name);
  };

  const handleUpdate = () => {
    if (!editName.trim()) {
      setError('Course name is required');
      return;
    }

    if (courses.some(course => 
      course.id !== editingId && 
      course.name.toLowerCase() === editName.toLowerCase()
    )) {
      setError('Course with this name already exists');
      return;
    }

    setCourses(courses.map(course => 
      course.id === editingId 
        ? { ...course, name: editName.trim() }
        : course
    ));
    setEditingId(null);
    setEditName('');
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setError('');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Courses</h1>
        <p>Manage different courses (e.g., Hindi, English, Urdu)</p>
      </div>

      <div className="form-section">
        <h2>Add New Course</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter course name (e.g., Hindi, English, Urdu)"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            className="form-input"
          />
          <button onClick={handleCreate} className="btn btn-primary">
            <Plus size={20} />
            Add Course
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="list-section">
        <h2>Existing Courses</h2>
        {courses.length === 0 ? (
          <div className="empty-state">
            <p>No courses created yet. Add your first course above.</p>
          </div>
        ) : (
          <div className="list-container">
            {courses.map((course) => (
              <div key={course.id} className="list-item">
                {editingId === course.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="form-input"
                    />
                    <div className="edit-actions">
                      <button onClick={handleUpdate} className="btn btn-success">
                        <Check size={16} />
                      </button>
                      <button onClick={handleCancelEdit} className="btn btn-secondary">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="item-name">{course.name}</span>
                    <div className="item-actions">
                      <button 
                        onClick={() => handleEdit(course)} 
                        className="btn btn-secondary"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)} 
                        className="btn btn-danger"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses; 