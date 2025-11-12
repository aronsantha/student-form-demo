import { Course, Subject, Student } from "./types";

export const COURSES: Course[] = [
  {
    id: "com",
    name: "Computer Science",
    subjectIds: [1, 2, 21, 22, 23, 24, 25],
  },
  {
    id: "bus",
    name: "Business Administration",
    subjectIds: [3, 4, 21, 22, 23, 24, 25],
  },
  {
    id: "des",
    name: "Design",
    subjectIds: [5, 6, 21, 22, 23, 24, 25],
  },
  {
    id: "psy",
    name: "Psychology",
    subjectIds: [7, 8, 21, 22, 23, 24, 25],
  },
  {
    id: "eng",
    name: "Engineering",
    subjectIds: [9, 10, 21, 22, 23, 24, 25],
  },
  {
    id: "hos",
    name: "Hospitality",
    subjectIds: [11, 12, 21, 22, 23, 24, 25],
  },
  {
    id: "bio",
    name: "Biology",
    subjectIds: [13, 14, 21, 22, 23, 24, 25],
  },
  {
    id: "art",
    name: "Art",
    subjectIds: [15, 16, 21, 22, 23, 24, 25],
  },
  {
    id: "med",
    name: "Medicine",
    subjectIds: [17, 18, 21, 22, 23, 24, 25],
  },
  {
    id: "law",
    name: "Law",
    subjectIds: [19, 20, 21, 22, 23, 24, 25],
  },
];

export const SUBJECTS: Subject[] = [
  // Course-specific subjects
  { id: 1, name: "Data Structures" },
  { id: 2, name: "Operating Systems" },

  { id: 3, name: "Marketing Fundamentals" },
  { id: 4, name: "Financial Accounting" },

  { id: 5, name: "Visual Communication" },
  { id: 6, name: "UX/UI Fundamentals" },

  { id: 7, name: "Cognitive Psychology" },
  { id: 8, name: "Developmental Psychology" },

  { id: 9, name: "Mechanics I" },
  { id: 10, name: "Thermodynamics I" },

  { id: 11, name: "Food & Beverage Management" },
  { id: 12, name: "Hotel Operations" },

  { id: 13, name: "Cell Biology" },
  { id: 14, name: "Genetics" },

  { id: 15, name: "Art History" },
  { id: 16, name: "Digital Illustration" },

  { id: 17, name: "Human Anatomy" },
  { id: 18, name: "Physiology" },

  { id: 19, name: "Criminal Law" },
  { id: 20, name: "Contract Law" },

  // Universal subjects
  { id: 21, name: "Introduction to Research" },
  { id: 22, name: "Ethics" },
  { id: 23, name: "Communication Skills" },
  { id: 24, name: "Statistics" },
  { id: 25, name: "Leadership & Teamwork" },
];

export const INITIAL_SUBJECT_PREFERENCES: { [key: number]: boolean } = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
  11: false,
  12: false,
  13: false,
  14: false,
  15: false,
  16: false,
  17: false,
  18: false,
  19: false,
  20: false,
  21: false,
  22: false,
  23: false,
  24: false,
  25: false,
};

export const DUMMY_STUDENTS: Student[] = [
  {
    name: "Paul Edwards",
    email: "paul@email.com",
    course: {
      id: "com",
      name: "Computer Science",
      subjectIds: [1, 2, 21, 22, 23, 24, 25],
    },
    subjects: [
      { id: 1, name: "Data Structures" },
      { id: 2, name: "Operating Systems" },
      { id: 21, name: "Introduction to Research" },
    ],
  },
  {
    name: "Tom Highland",
    email: "tom@email.com",
    course: {
      id: "med",
      name: "Medicine",
      subjectIds: [17, 18, 21, 22, 23, 24, 25],
    },
    subjects: [
      { id: 18, name: "Physiology" },
      { id: 24, name: "Statistics" },
      { id: 25, name: "Leadership & Teamwork" },
    ],
  },
  {
    name: "Rosa Park",
    email: "rosa@email.com",
    course: {
      id: "des",
      name: "Design",
      subjectIds: [5, 6, 21, 22, 23, 24, 25],
    },
    subjects: [
      { id: 23, name: "Communication Skills" },
      { id: 24, name: "Statistics" },
      { id: 25, name: "Leadership & Teamwork" },
    ],
  },
];

export const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+-\.]*)[A-Z0-9_'+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
