import { useState } from "react";
import { DUMMY_STUDENTS } from "./constants";
import { Student } from "./types";
import StudentList from "./components/StudentList";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  const [enrolledStudents, setEnrolledStudents] =
    useState<Student[]>(DUMMY_STUDENTS);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  function handleSelectStudentForEdit(student: Student): void {
    setSelectedStudent({ ...student });
  }

  return (
    <>
      <div className="m-10 mx-auto w-full max-w-[80vw] rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-10 text-2xl font-bold">Student enrollment</h1>
        <div className="flex h-full flex-row gap-3">
          <div className="grow">
            <RegistrationForm
              enrolledStudents={enrolledStudents}
              setEnrolledStudents={setEnrolledStudents}
              studentToEdit={selectedStudent}
            />
          </div>

          <div className="min-w-[30%] max-w-[50%]">
            <StudentList
              students={enrolledStudents}
              handleSelectStudent={handleSelectStudentForEdit}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
