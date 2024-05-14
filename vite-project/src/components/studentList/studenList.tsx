import React, { useState } from "react";
import { Student } from "./types";
import Pagination from "./pagination";
import SearchInput from "./search";
import AddStudentModal from "./addStudent";
import EditStudentModal from "./editStudent";
import ConfirmationModal from "./confirmModal";

interface StudentListProps {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (studentId: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, addStudent, updateStudent, deleteStudent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const filteredStudents = students.filter((student) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(normalizedSearchTerm) ||
      student.email.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleAddStudent = () => {
    setShowAddModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleDeleteStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowConfirmationModal(true);
  };

  const confirmDeleteStudent = () => {
    if (selectedStudent) {
      deleteStudent(selectedStudent.id);
      setSelectedStudent(null);
      setShowConfirmationModal(false);
    }
  };

  return (
    <div>
      <button onClick={handleAddStudent}>Thêm mới sinh viên</button>
      <SearchInput onSearch={handleSearch} />

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã sinh viên</th>
            <th>Tên sinh viên</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1 + (currentPage - 1) * studentsPerPage}</td>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>
                <button onClick={() => handleEditStudent(student)}>Chỉnh</button>
                <button onClick={() => handleDeleteStudent(student)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        studentsPerPage={studentsPerPage}
        totalStudents={filteredStudents.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onSave={(newStudent: Student) => {
            addStudent(newStudent);
            setShowAddModal(false);
          }}
        />
      )}
      {showEditModal && selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() => setShowEditModal(false)}
          isOpen={showEditModal}
          onSave={(updatedStudent: Student) => {
            updateStudent(updatedStudent);
            setShowEditModal(false);
          }}
        />
      )}
      {showConfirmationModal && selectedStudent && (
        <ConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={confirmDeleteStudent}
          message={`Are you sure you want to delete ${selectedStudent.name}?`}
        />
      )}
    </div>
  );
};

export default StudentList;
