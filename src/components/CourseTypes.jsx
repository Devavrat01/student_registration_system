import { useState } from 'react';
import { Plus, Edit, Trash2, X, Check } from 'lucide-react';

const CourseTypes = ({ courseTypes, setCourseTypes }) => {
  const [newTypeName, setNewTypeName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!newTypeName.trim()) {
      setError('Course type name is required');
      return;
    }

    if (courseTypes.some(type => type.name.toLowerCase() === newTypeName.toLowerCase())) {
      setError('Course type with this name already exists');
      return;
    }

    const newType = {
      id: Date.now().toString(),
      name: newTypeName.trim()
    };

    setCourseTypes([...courseTypes, newType]);
    setNewTypeName('');
    setError('');
  };

  const handleEdit = (type) => {
    setEditingId(type.id);
    setEditName(type.name);
  };

  const handleUpdate = () => {
    if (!editName.trim()) {
      setError('Course type name is required');
      return;
    }

    if (courseTypes.some(type => 
      type.id !== editingId && 
      type.name.toLowerCase() === editName.toLowerCase()
    )) {
      setError('Course type with this name already exists');
      return;
    }

    setCourseTypes(courseTypes.map(type => 
      type.id === editingId 
        ? { ...type, name: editName.trim() }
        : type
    ));
    setEditingId(null);
    setEditName('');
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course type?')) {
      setCourseTypes(courseTypes.filter(type => type.id !== id));
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
        <h1>Course Types</h1>
        <p>Manage different types of courses (e.g., Individual, Group, Special)</p>
      </div>

      <div className="form-section">
        <h2>Add New Course Type</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter course type name (e.g., Individual, Group, Special)"
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            className="form-input"
          />
          <button onClick={handleCreate} className="btn btn-primary">
            <Plus size={20} />
            Add Course Type
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="list-section">
        <h2>Existing Course Types</h2>
        {courseTypes.length === 0 ? (
          <div className="empty-state">
            <p>No course types created yet. Add your first course type above.</p>
          </div>
        ) : (
          <div className="list-container">
            {courseTypes.map((type) => (
              <div key={type.id} className="list-item">
                {editingId === type.id ? (
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
                    <span className="item-name">{type.name}</span>
                    <div className="item-actions">
                      <button 
                        onClick={() => handleEdit(type)} 
                        className="btn btn-secondary"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(type.id)} 
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

export default CourseTypes; 