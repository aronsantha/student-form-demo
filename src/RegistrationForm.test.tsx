import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegistrationForm from "./components/RegistrationForm";
import StudentList from "./components/StudentList";
import { COURSES, DUMMY_STUDENTS, SUBJECTS } from "./constants";
import { useState } from "react";
import { Student } from "./types";

describe("RegistrationForm", () => {
  test("renders the registration form title and fields", () => {
    render(
      <RegistrationForm
        enrolledStudents={[]}
        setEnrolledStudents={jest.fn()}
        studentToEdit={null}
      />,
    );

    expect(screen.getByText("Register new student")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText(COURSES[1].name)).toBeInTheDocument();
    expect(screen.getByText(SUBJECTS[24].name)).toBeInTheDocument();
  });

  test("shows 3 validation errors when submitting without data", async () => {
    render(
      <RegistrationForm
        enrolledStudents={[]}
        setEnrolledStudents={jest.fn()}
        studentToEdit={null}
      />,
    );

    fireEvent.click(screen.getByText("Register"));
    const errors = await screen.findAllByText("Error:");
    expect(errors).toHaveLength(3);
  });

  test("shows no errors if name, email, and 3 checkboxes are completed", async () => {
    const mockSetEnrolledStudents = jest.fn();

    render(
      <RegistrationForm
        enrolledStudents={[]}
        setEnrolledStudents={mockSetEnrolledStudents}
        studentToEdit={null}
      />,
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Brandon Sanderson" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "brandon@gmail.com" },
    });

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);

    fireEvent.click(screen.getByText("Register"));
    const errors = screen.queryAllByText("Error:");
    expect(errors).toHaveLength(0);
  });

  test("creates student if name, email, and 3 checkboxes are completed", async () => {
    const mockSetEnrolledStudents = jest.fn();

    render(
      <RegistrationForm
        enrolledStudents={[]}
        setEnrolledStudents={mockSetEnrolledStudents}
        studentToEdit={null}
      />,
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Brandon Sanderson" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "brandon@gmail.com" },
    });

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);

    fireEvent.click(screen.getByText("Register"));

    await waitFor(
      () => {
        expect(mockSetEnrolledStudents).toHaveBeenCalledTimes(1);
      },
      { timeout: 1500 },
    );
  });

  test("student appears in list after creation", async () => {
    function Wrapper() {
      const [students, setStudents] = useState<Student[]>(DUMMY_STUDENTS);

      return (
        <>
          <RegistrationForm
            enrolledStudents={students}
            setEnrolledStudents={setStudents}
            studentToEdit={null}
          />
          <StudentList students={students} handleSelectStudent={() => {}} />
        </>
      );
    }

    render(<Wrapper />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Brandon Sanderson" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "brandon@gmail.com" },
    });

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);

    fireEvent.click(screen.getByText("Register"));

    const studentsInList = await screen.findAllByText(
      "Brandon Sanderson",
      {},
      { timeout: 2000 },
    );

    await waitFor(
      () => {
        expect(screen.getByText("Brandon Sanderson")).toBeInTheDocument();

        const subjectName = screen.getAllByText("Introduction to Research");
        expect(subjectName).toHaveLength(3);
      },
      { timeout: 1500 },
    );
  });
});
