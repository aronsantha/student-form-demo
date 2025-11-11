import React from "react";
import { useState } from "react";

// import { courses, subjects } from "./constants";

function App() {
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  return (
    <>
      <div className="mx-auto flex h-screen items-center justify-center">
        <div className="min-h-[10vh] w-full max-w-[800px] rounded bg-white p-10">
          <h1 className="mb-10 text-2xl font-bold">Student Enrollment</h1>
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-5">
                <h2 className="text-xl font-bold">Register</h2>
                <p className="text-xs text-neutral-600">
                  Fill in and submit the form to register yourself
                </p>
              </div>
              <div>FORM</div>
            </div>
            <div>
              <div>
                <div className="mb-5">
                  <h2 className="text-xl font-bold">Enrolled students</h2>
                  <p className="text-xs text-neutral-600">
                    See and edit enrolled students.
                  </p>
                </div>
                {enrolledStudents.length === 0 ? (
                  <div className="rounded bg-neutral-100 py-4">
                    <p className="text-center text-sm text-neutral-600">
                      No students have enrolled yet. Click the "Register" button
                      to enroll.
                    </p>
                  </div>
                ) : (
                  <div>{enrolledStudents}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
