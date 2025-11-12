# student-form-demo

A small demo app where user can enroll into a course, select their subjects, and later adjust their options.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Tech choices

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), as it comes with Jest by default and compatible with react testing library. (I would normally go with Vite, so this was a new approach for me.)
- Using typescript to ensure type safety and catch type errors early.
- Considered using React Hook Form form and Zod for form validation, they ended up being overkill for such a small complexity app. Ended up handwriting the validation natively in React.
- As using a backend and database was discouraged, I considered using localStorage to imitate data persistence of submitted student forms, but eventually spent my efforts on other parts of the app (also because it was emphasysed that it's not a priorty).
- Data that would normally come from the backend (courses and subjects) is saved in constants.ts.
- I include a default array of 3 students to populate the list, this comes from DUMMY_STUDENTS in constants.ts.
- Along the way I made efforts to tidy up the code from time to time. Eventually also moved RegistrationForm and StudentList to their own components, this way App.tsx is handling much less stuff and has a clearer overview, more like in a prod. ready app.
- I made an attempt to write tests and managed to make the tests pass but they would require more attention.
