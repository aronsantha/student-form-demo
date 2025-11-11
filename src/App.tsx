import React from "react";
import { useState } from "react";
import { COURSES, SUBJECTS, INITIAL_SUBJECT_PREFERENCES } from "./constants";
import { Student } from "./types";

function App() {
  const [enrolledStudents, setEnrolledStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
  const [subjectPreferenceMap, setSubjectPreferenceMap] = useState(
    INITIAL_SUBJECT_PREFERENCES,
  );
  const [submitStatus, setSubmitStatus] = useState("idle");

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitStatus("loading");

    const newStudent: Student = {
      name,
      email: emailAddress,
      course: selectedCourse.name,
      subjects: getSelectedSubjects(),
    };

    setTimeout(() => {
      setEnrolledStudents((prev) => [...prev, newStudent]);
      setSubmitStatus("idle");
    }, 1000);
  }

  const relevantSubjects = selectedCourse
    ? SUBJECTS.filter((subject) =>
        selectedCourse["subjectIds"].includes(subject.id),
      )
    : [];

  return (
    <>
      <div className="m-10 mx-auto w-full max-w-[80vw] rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-10 text-2xl font-bold">Student enrollment</h1>
        <div className="h-fullflex-row flex gap-3">
          <div className="grow rounded bg-neutral-100 p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">Register</h2>
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
                {submitStatus === "idle" && <div>Register</div>}
                {submitStatus === "loading" && <div>Loading...</div>}
              </button>
            </form>
          </div>

          <div className="min-w-[30%] max-w-[50%] rounded p-4">
            <div className="mb-5">
              <h2 className="text-xl font-bold">Enrolled students</h2>
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
                <pre>{JSON.stringify(enrolledStudents, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
