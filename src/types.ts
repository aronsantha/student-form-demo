export interface Subject {
  id: number;
  name: string;
}

export interface Course {
  id: string;
  name: string;
  subjectIds: number[];
}

export interface Student {
  name: string;
  email: string;
  course: Course;
  subjects: Subject[];
}
