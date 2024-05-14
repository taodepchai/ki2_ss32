import React, { useState } from "react";
import { Student } from "./types";

interface AddStudentModalProps {
  onClose: () => void;
  onSave: (student: Student) => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose, onSave }) => {
  const [newStudent, setNewStudent] = useState<Student>({
    id: "",
    name: "",
    birthdate: "",
    email: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newStudent);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          ×
        </span>
        <h2>Thêm mới sinh viên</h2>
        <form onSubmit={handleSubmit}>
          <label>
            ID:
            <input type="text" name="id" value={newStudent.id} onChange={handleChange} />
          </label><br />
          <label>
            Tên:
            <input type="text" name="name" value={newStudent.name} onChange={handleChange} />
          </label><br />
          <label>
            Ngày sinh:
            <input type="date" name="birthdate" value={newStudent.birthdate} onChange={handleChange} />
          </label><br />
          <label>
            Email:
            <input type="email" name="email" value={newStudent.email} onChange={handleChange} />
          </label><br />
          <label>
            Trạng thái:
            <select name="status" value={newStudent.status} onChange={handleChange}>
              <option value="">Chọn trạng thái</option>
              <option value="active">Đang học</option>
              <option value="inactive">Đã nghỉ</option>
            </select>
          </label><br />
          <button type="submit" >Thêm mới</button>
          <button type="button" onClick={onClose}>Hủy</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
