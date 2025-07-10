import { useState } from 'react';
import { Plus, Edit, Trash2, X, Check, Filter } from 'lucide-react';

const StudentRegistrations = ({ courseOfferings, studentRegistrations, setStudentRegistrations }) => {
  const [studentName, setStudentName] = useState('');
  const [selectedOffering, setSelectedOffering] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editStudentName, setEditStudentName] = useState('');
  const [editOffering, setEditOffering] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [error, setError] = useState('');
  const [filterCourseType, setFilterCourseType] = useState('');

  // Get unique course types from offerings for filtering
  const courseTypes = [...new Set(courseOfferings.map(offering => offering.courseTypeName))];

  // Filter offerings based on selected course type
  const filteredOfferings = filterCourseType 
    ? courseOfferings.filter(offering => offering.courseTypeName === filterCourseType)
    : courseOfferings;

  const handleCreate = () => {
    if (!studentName.trim() || !selectedOffering || !email.trim()) {
      setError('Student name, course offering, and email are required');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    const offering = courseOfferings.find(o => o.id === selectedOffering);
    
    if (studentRegistrations.some(reg => 
      reg.studentName.toLowerCase() === studentName.toLowerCase() && 
      reg.courseOfferingId === selectedOffering
    )) {
      setError('This student is already registered for this course offering');
      return;
    }

    const newRegistration = {
      id: Date.now().toString(),
      studentName: studentName.trim(),
      courseOfferingId: selectedOffering,
      courseOfferingName: offering.name,
      email: email.trim(),
      phone: phone.trim(),
      registrationDate: new Date().toISOString()
    };

    setStudentRegistrations([...studentRegistrations, newRegistration]);
    setStudentName('');
    setSelectedOffering('');
    setEmail('');
    setPhone('');
    setError('');
  };

  const handleEdit = (registration) => {
    setEditingId(registration.id);
    setEditStudentName(registration.studentName);
    setEditOffering(registration.courseOfferingId);
    setEditEmail(registration.email);
    setEditPhone(registration.phone);
  };

  const handleUpdate = () => {
    if (!editStudentName.trim() || !editOffering || !editEmail.trim()) {
      setError('Student name, course offering, and email are required');
      return;
    }

    if (!editEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    const offering = courseOfferings.find(o => o.id === editOffering);

    if (studentRegistrations.some(reg => 
      reg.id !== editingId &&
      reg.studentName.toLowerCase() === editStudentName.toLowerCase() && 
      reg.courseOfferingId === editOffering
    )) {
      setError('This student is already registered for this course offering');
      return;
    }

    setStudentRegistrations(studentRegistrations.map(reg => 
      reg.id === editingId 
        ? { 
            ...reg, 
            studentName: editStudentName.trim(),
            courseOfferingId: editOffering,
            courseOfferingName: offering.name,
            email: editEmail.trim(),
            phone: editPhone.trim()
          }
        : reg
    ));
    setEditingId(null);
    setEditStudentName('');
    setEditOffering('');
    setEditEmail('');
    setEditPhone('');
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student registration?')) {
      setStudentRegistrations(studentRegistrations.filter(reg => reg.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditStudentName('');
    setEditOffering('');
    setEditEmail('');
    setEditPhone('');
    setError('');
  };

  // Get registrations for a specific offering
  const getRegistrationsForOffering = (offeringId) => {
    return studentRegistrations.filter(reg => reg.courseOfferingId === offeringId);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Student Registrations</h1>
        <p>Manage student registrations for course offerings</p>
      </div>

      <div className="form-section">
        <h2>Register New Student</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="form-input"
          />
          <select
            value={selectedOffering}
            onChange={(e) => setSelectedOffering(e.target.value)}
            className="form-select"
          >
            <option value="">Select Course Offering</option>
            {courseOfferings.map((offering) => (
              <option key={offering.id} value={offering.id}>
                {offering.name}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          <input
            type="tel"
            placeholder="Phone Number (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
          />
          <button onClick={handleCreate} className="btn btn-primary">
            <Plus size={20} />
            Register Student
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="filter-section">
        <h2>Filter by Course Type</h2>
        <div className="form-group">
          <select
            value={filterCourseType}
            onChange={(e) => setFilterCourseType(e.target.value)}
            className="form-select"
          >
            <option value="">All Course Types</option>
            {courseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="list-section">
        <h2>Available Course Offerings & Registrations</h2>
        {filteredOfferings.length === 0 ? (
          <div className="empty-state">
            <p>No course offerings available for the selected filter.</p>
          </div>
        ) : (
          <div className="offerings-container">
            {filteredOfferings.map((offering) => {
              const registrations = getRegistrationsForOffering(offering.id);
              return (
                <div key={offering.id} className="offering-card">
                  <div className="offering-header">
                    <h3>{offering.name}</h3>
                    <span className="registration-count">
                      {registrations.length} student{registrations.length !== 1 ? 's' : ''} registered
                    </span>
                  </div>
                  
                  {registrations.length > 0 ? (
                    <div className="registrations-list">
                      {registrations.map((registration) => (
                        <div key={registration.id} className="registration-item">
                          {editingId === registration.id ? (
                            <div className="edit-form">
                              <input
                                type="text"
                                placeholder="Student Name"
                                value={editStudentName}
                                onChange={(e) => setEditStudentName(e.target.value)}
                                className="form-input"
                              />
                              <select
                                value={editOffering}
                                onChange={(e) => setEditOffering(e.target.value)}
                                className="form-select"
                              >
                                <option value="">Select Course Offering</option>
                                {courseOfferings.map((o) => (
                                  <option key={o.id} value={o.id}>
                                    {o.name}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="email"
                                placeholder="Email Address"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                className="form-input"
                              />
                              <input
                                type="tel"
                                placeholder="Phone Number"
                                value={editPhone}
                                onChange={(e) => setEditPhone(e.target.value)}
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
                              <div className="student-info">
                                <span className="student-name">{registration.studentName}</span>
                                <span className="student-email">{registration.email}</span>
                                {registration.phone && (
                                  <span className="student-phone">{registration.phone}</span>
                                )}
                              </div>
                              <div className="item-actions">
                                <button 
                                  onClick={() => handleEdit(registration)} 
                                  className="btn btn-secondary"
                                  title="Edit"
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(registration.id)} 
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
                  ) : (
                    <p className="no-registrations">No students registered for this offering yet.</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRegistrations; 