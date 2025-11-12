import { EMAIL_REGEX } from "./constants";
import { FormStatus, Student, ValidationErrors } from "./types";

function getAllStudentEmails(students: Student[]) {
  return students.length === 0 ? [] : students.map((student) => student.email);
}

export function getValidationErrors(
  student: Student,
  enrolledStudents: Student[],
  status: FormStatus,
): ValidationErrors | null {
  const errors: ValidationErrors = {};

  if (!student.name.trim()) {
    errors.name = "Name is required";
  }

  if (!student.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(student.email)) {
    errors.email = "Invalid email format";
  } else if (
    status === "NEW" &&
    getAllStudentEmails(enrolledStudents).includes(student.email)
  ) {
    errors.email =
      "This email has already been used to create an account. Edit your account on the right side, or create a new one with another email.";
  }

  if (student.subjects.length < 3) {
    errors.subjects = "Select at least 3 subjects";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
