import { useState } from 'react';
import { Plus, Edit, Trash2, X, Check } from 'lucide-react';

const CourseOfferings = ({ courseTypes, courses, courseOfferings, setCourseOfferings }) => {
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editCourseType, setEditCourseType] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!selectedCourseType || !selectedCourse) {
      setError('Please select both course type and course');
      return;
    }

    const courseType = courseTypes.find(type => type.id === selectedCourseType);
    const course = courses.find(c => c.id === selectedCourse);
    
    const offeringName = `${courseType.name} - ${course.name}`;
    
    if (courseOfferings.some(offering => offering.name === offeringName)) {
      setError('This course offering already exists');
      return;
    }

    const newOffering = {
      id: Date.now().toString(),
      name: offeringName,
      courseTypeId: selectedCourseType,
      courseId: selectedCourse,
      courseTypeName: courseType.name,
      courseName: course.name
    };

    setCourseOfferings([...courseOfferings, newOffering]);
    setSelectedCourseType('');
    setSelectedCourse('');
    setError('');
  };

  const handleEdit = (offering) => {
    setEditingId(offering.id);
    setEditCourseType(offering.courseTypeId);
    setEditCourse(offering.courseId);
  };

  const handleUpdate = () => {
    if (!editCourseType || !editCourse) {
      setError('Please select both course type and course');
      return;
    }

    const courseType = courseTypes.find(type => type.id === editCourseType);
    const course = courses.find(c => c.id === editCourse);
    const offeringName = `${courseType.name} - ${course.name}`;

    if (courseOfferings.some(offering => 
      offering.id !== editingId && 
      offering.name === offeringName
    )) {
      setError('This course offering already exists');
      return;
    }

    setCourseOfferings(courseOfferings.map(offering => 
      offering.id === editingId 
        ? { 
            ...offering, 
            name: offeringName,
            courseTypeId: editCourseType,
            courseId: editCourse,
            courseTypeName: courseType.name,
            courseName: course.name
          }
        : offering
    ));
    setEditingId(null);
    setEditCourseType('');
    setEditCourse('');
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course offering?')) {
      setCourseOfferings(courseOfferings.filter(offering => offering.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditCourseType('');
    setEditCourse('');
    setError('');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Course Offerings</h1>
        <p>Create course offerings by associating courses with course types</p>
      </div>

      <div className="form-section">
        <h2>Add New Course Offering</h2>
        <div className="form-group">
          <select
            value={selectedCourseType}
            onChange={(e) => setSelectedCourseType(e.target.value)}
            className="form-select"
          >
            <option value="">Select Course Type</option>
            {courseTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="form-select"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <button onClick={handleCreate} className="btn btn-primary">
            <Plus size={20} />
            Create Offering
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="list-section">
        <h2>Available Course Offerings</h2>
        {courseOfferings.length === 0 ? (
          <div className="empty-state">
            <p>No course offerings created yet. Create your first offering above.</p>
          </div>
        ) : (
          <div className="list-container">
            {courseOfferings.map((offering) => (
              <div key={offering.id} className="list-item">
                {editingId === offering.id ? (
                  <div className="edit-form">
                    <select
                      value={editCourseType}
                      onChange={(e) => setEditCourseType(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select Course Type</option>
                      {courseTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={editCourse}
                      onChange={(e) => setEditCourse(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
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
                    <span className="item-name">{offering.name}</span>
                    <div className="item-actions">
                      <button 
                        onClick={() => handleEdit(offering)} 
                        className="btn btn-secondary"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(offering.id)} 
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

export default CourseOfferings; 