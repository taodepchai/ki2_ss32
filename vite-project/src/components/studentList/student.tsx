import React, { useEffect, useState } from 'react';
import StudentList from './studenList';
import { Student } from './types';

const StudentApp: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(JSON.parse(localStorage.getItem('students')!));
  const addStudent = (student: Student) => {
    localStorage.setItem('students', JSON.stringify([...students, student]));
    setStudents([...students, student]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(students.map(student => student.id === updatedStudent.id ? updatedStudent : student));
  };

  const deleteStudent = (studentId: string) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  return (
    <div className="container">
      <h1>Quản lý sinh viên</h1>
      <StudentList
        students={students}
        addStudent={addStudent}
        updateStudent={updateStudent}
        deleteStudent={deleteStudent}
      />
    </div>
  );
};

export default StudentApp;
