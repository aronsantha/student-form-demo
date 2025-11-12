import { Student } from "../types";

function StudentList({
  students,
  handleSelectStudent,
}: {
  students: Student[];
  handleSelectStudent: (student: Student) => void;
}) {
  return (
    <div className="p-4">
      <div className="mb-5">
        <h2 className="text-xl font-bold">Enrolled students</h2>
        <p className="text-xs text-neutral-600">
          See and edit enrolled students.
        </p>
      </div>
      {students.length === 0 ? (
        <div className="rounded bg-neutral-100 py-4">
          <p className="px-6 py-4 text-center text-sm text-neutral-600">
            No students have enrolled yet. Click the "Register" button to
            enroll.
          </p>
        </div>
      ) : (
        <div>
          {students.map((student) => (
            <div
              key={student.email}
              className="mb-4 rounded border border-neutral-300 p-4"
            >
              <h3 className="mb-3 font-bold">{student.name}</h3>
              <div className="text-sm text-neutral-700">
                <p>Email: {student.email}</p>
                <p>Course: {student.course.name}</p>
                <p>Subjects:</p>
                <ul className="list-disc pl-5">
                  {student.subjects.map((subject) => (
                    <li key={subject.id}>{subject.name}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleSelectStudent(student)}
                className="mt-4 w-fit rounded bg-emerald-600 px-6 py-2 text-sm text-white hover:bg-emerald-700"
              >
                Edit student
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;
