import React, { useEffect, useState } from 'react';
import StudentList from './studenList';
import { Student } from './types';

const StudentApp: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(() => {
    const storedStudents = localStorage.getItem('students');
    return storedStudents ? JSON.parse(storedStudents) : [];
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (student: Student) => {
    setStudents(prevStudents => [...prevStudents, student]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prevStudents =>
      prevStudents.map(student => student.id === updatedStudent.id ? updatedStudent : student)
    );
  };

  const deleteStudent = (studentId: string) => {
    setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId));
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
