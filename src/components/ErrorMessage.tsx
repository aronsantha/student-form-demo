import { ValidationErrors } from "../types";

function ErrorMessage({
  errors,
  type,
}: {
  errors: ValidationErrors | null;
  type: keyof ValidationErrors;
}) {
  if (!errors?.[type]) return null;
  return (
    <div className="mb-3 rounded bg-red-100 p-4 text-sm">
      <p>
        <span className="font-bold"> Error: </span>
        {errors[type]}
      </p>
    </div>
  );
}

export default ErrorMessage;
