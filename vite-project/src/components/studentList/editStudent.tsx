import React, { useState, useEffect } from 'react';
import { Student } from './types';

interface EditStudentModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedStudent: Student) => void;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ student, isOpen, onClose, onSave }) => {
  const [editedStudent, setEditedStudent] = useState<Student>(student);

  useEffect(() => {
    setEditedStudent(student);
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedStudent);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          ×
        </span>
        <h2>Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <label>
            ID:
            <input type="text" name="id" value={editedStudent.id} onChange={handleChange} readOnly />
          </label>
          <label>
            Name:
            <input type="text" name="name" value={editedStudent.name} onChange={handleChange} />
          </label>
          <label>
            Birthdate:
            <input type="date" name="birthdate" value={editedStudent.birthdate} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={editedStudent.email} onChange={handleChange} />
          </label>
          <label>
            Status:
            <select name="status" value={editedStudent.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
