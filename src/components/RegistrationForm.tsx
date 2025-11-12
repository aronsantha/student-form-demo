import { useState, useEffect } from "react";
import { COURSES, INITIAL_SUBJECT_PREFERENCES, SUBJECTS } from "../constants";
import ErrorMessage from "./ErrorMessage";
import { getValidationErrors } from "../utils";
import { FormStatus, Student, SubmitStatus, ValidationErrors } from "../types";

function RegistrationForm({
  enrolledStudents,
  setEnrolledStudents,
  studentToEdit,
}: {
  enrolledStudents: Student[];
  setEnrolledStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  studentToEdit: Student | null;
}) {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
  const [subjectPreferenceMap, setSubjectPreferenceMap] = useState(
    INITIAL_SUBJECT_PREFERENCES,
  );
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("IDLE");
  const [formStatus, setFormStatus] = useState<FormStatus>("NEW");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>();

  useEffect(() => {
    if (!studentToEdit) return;

    resetForm();

    const savedSubjects = { ...INITIAL_SUBJECT_PREFERENCES };
    studentToEdit.subjects.forEach(
      (subject) => (savedSubjects[subject.id] = true),
    );

    setFormStatus("EDIT");
    setName(studentToEdit.name);
    setEmailAddress(studentToEdit.email);
    setSelectedCourse(studentToEdit.course);
    setSubjectPreferenceMap(savedSubjects);
  }, [studentToEdit]);

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

  function resetForm() {
    setName("");
    setEmailAddress("");
    setSelectedCourse(COURSES[0]);
    setSubjectPreferenceMap(INITIAL_SUBJECT_PREFERENCES);
    setValidationErrors(undefined);
    setSubmitStatus("IDLE");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitStatus("LOADING");

    const newStudent: Student = {
      name,
      email: emailAddress,
      course: selectedCourse,
      subjects: getSelectedSubjects(),
    };

    const errors = getValidationErrors(
      newStudent,
      enrolledStudents,
      formStatus,
    );
    if (errors) {
      setValidationErrors(errors);
      setSubmitStatus("IDLE");
      return;
    }

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

  return (
    <div className="rounded bg-neutral-100 p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold">{stringMap.title}</h2>
        <p className="text-xs text-neutral-600">
          Fill in and submit the form to register yourself
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="name-field" className="text-xs">
            Name
          </label>
          <ErrorMessage errors={validationErrors || null} type="name" />
          <input
            className="grow rounded border border-gray-300 px-2 py-1"
            placeholder="Type your name here"
            id="name-field"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="email-field" className="text-xs">
            Email Address
          </label>
          <ErrorMessage errors={validationErrors || null} type="email" />
          <input
            className="grow rounded border border-gray-300 px-2 py-1 disabled:cursor-not-allowed"
            disabled={formStatus === "EDIT"}
            placeholder="Type your email address here"
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
          <legend className="px-3 text-xs">Select subjects (min. 3):</legend>

          <ErrorMessage errors={validationErrors || null} type="subjects" />

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
          disabled={submitStatus === "LOADING"}
          type="submit"
          className="w-fit rounded bg-emerald-600 px-12 py-2 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {submitStatus === "IDLE" && <div>{stringMap.button}</div>}
          {submitStatus === "LOADING" && <div>Saving...</div>}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
