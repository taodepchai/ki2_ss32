import React, { useState, useEffect } from 'react';
import StudentList from './studenList';
import { Student } from './types';

const StudentApp: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (student: Student) => {
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
