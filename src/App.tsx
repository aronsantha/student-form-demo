import React from "react";
import { useState } from "react";
import {
  COURSES,
  SUBJECTS,
  INITIAL_SUBJECT_PREFERENCES,
  DUMMY_STUDENTS,
} from "./constants";
import { Student, SubmitStatus, FormStatus } from "./types";

function App() {
  const [enrolledStudents, setEnrolledStudents] =
    useState<Student[]>(DUMMY_STUDENTS);
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
  const [subjectPreferenceMap, setSubjectPreferenceMap] = useState(
    INITIAL_SUBJECT_PREFERENCES,
  );
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("IDLE");
  const [formStatus, setFormStatus] = useState<FormStatus>("NEW");

  function handleChangeCourse(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedCourseId = event.target.value;
    const courseObj = COURSES.find((course) => course.id === selectedCourseId);
    if (!courseObj) return;
    setSelectedCourse(courseObj);
    setSubjectPreferenceMap(INITIAL_SUBJECT_PREFERENCES);
  }

  function getSelectedSubjects() {
    return SUBJECTS.filter(
      (subject) => subjectPreferenceMap[subject.id] === true,
    );
  }

  // function getAllStudentEmails() {
  //   return enrolledStudents.length === 0
  //     ? []
  //     : enrolledStudents.map((student) => student.email);
  // }

  function resetForm() {
    setName("");
    setEmailAddress("");
    setSelectedCourse(COURSES[0]);
    setSubjectPreferenceMap(INITIAL_SUBJECT_PREFERENCES);
    setSubmitStatus("IDLE");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitStatus("LOADING");

    console.log(submitStatus);

    const newStudent: Student = {
      name,
      email: emailAddress,
      course: selectedCourse,
      subjects: getSelectedSubjects(),
    };

    setTimeout(() => {
      setEnrolledStudents((prev) =>
        formStatus === "NEW"
          ? [...prev, newStudent]
          : prev.map((student) =>
              student.email === emailAddress ? newStudent : student,
            ),
      );

      resetForm();
      setFormStatus("NEW");
    }, 1000);
  }

  const relevantSubjects = selectedCourse
    ? SUBJECTS.filter((subject) =>
        selectedCourse["subjectIds"].includes(subject.id),
      )
    : [];

  const stringMap =
    formStatus === "NEW"
      ? {
          title: "Register new student",
          button: "Register",
        }
      : {
          title: "Edit student",
          button: "Save",
        };

  function handleSelectStudentForEdit(student: Student): void {
    resetForm();
    const savedSubjects = { ...INITIAL_SUBJECT_PREFERENCES };
    student.subjects.forEach((subject) => (savedSubjects[subject.id] = true));

    setFormStatus("EDIT");
    setName(student.name);
    setEmailAddress(student.email);
    setSelectedCourse(student.course);
    setSubjectPreferenceMap(savedSubjects);
  }
  return (
    <>
      <div className="m-10 mx-auto w-full max-w-[80vw] rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-10 text-2xl font-bold">Student enrollment</h1>
        <div className="flex h-full flex-row gap-3">
          <div className="grow rounded bg-neutral-100 p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">{stringMap.title}</h2>
              <p className="text-xs text-neutral-600">
                Fill in and submit the form to register yourself
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-5"
            >
              <div className="flex w-full flex-col-reverse gap-1">
                <label htmlFor="name-field" className="text-xs">
                  Name
                </label>
                <input
                  className="grow rounded border border-gray-300 px-2 py-1"
                  id="name-field"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className="flex w-full flex-col-reverse gap-1">
                <label htmlFor="email-field" className="text-xs">
                  Email Address
                </label>
                <input
                  className="grow rounded border border-gray-300 px-2 py-1"
                  id="email-field"
                  value={emailAddress}
                  onChange={(event) => {
                    setEmailAddress(event.target.value);
                  }}
                />
              </div>

              <fieldset className="rounded border border-neutral-300 bg-white p-5">
                <legend className="px-3 text-xs">Select course</legend>
                <select
                  className="min-w-[400px] rounded border p-2"
                  id="course-select"
                  value={selectedCourse.id}
                  onChange={(event) => {
                    handleChangeCourse(event);
                  }}
                >
                  {COURSES.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="rounded border border-neutral-300 bg-white p-5">
                <legend className="px-3 text-xs">
                  Select 3 or more subjects:
                </legend>

                {relevantSubjects.map((subject) => (
                  <div key={subject.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={subject.name}
                      value={subject.name}
                      checked={subjectPreferenceMap[subject.id] === true}
                      onChange={(event) => {
                        setSubjectPreferenceMap({
                          ...subjectPreferenceMap,
                          [subject.id]: event.target.checked,
                        });
                      }}
                    />
                    <label htmlFor={subject.name}>{subject.name}</label>
                  </div>
                ))}
              </fieldset>
              <button
                type="submit"
                className="w-fit rounded bg-emerald-600 px-12 py-2 text-white hover:bg-emerald-700"
                aria-label="Register a new student"
              >
                {submitStatus === "IDLE" && <div>{stringMap.button}</div>}
                {submitStatus === "LOADING" && <div>Saving...</div>}
              </button>
            </form>
          </div>

          <div className="min-w-[30%] max-w-[50%] rounded p-4">
            <div className="mb-5">
              <h2 className="text-xl font-bold">ENROLLED STUDENTS</h2>
              <p className="text-xs text-neutral-600">
                See and edit enrolled students.
              </p>
            </div>
            {enrolledStudents.length === 0 ? (
              <div className="rounded bg-neutral-100 py-4">
                <p className="px-6 py-4 text-center text-sm text-neutral-600">
                  No students have enrolled yet. Click the "Register" button to
                  enroll.
                </p>
              </div>
            ) : (
              <div>
                {enrolledStudents.map((student) => (
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
                      onClick={() => handleSelectStudentForEdit(student)}
                      className="mt-4 w-fit rounded bg-emerald-600 px-6 py-2 text-sm text-white hover:bg-emerald-700"
                    >
                      Edit student
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
