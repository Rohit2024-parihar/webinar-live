import { IWebinarData } from "../redux/features/webinarInfoSlice";

export const validateForm = (
  formValues: IWebinarData,
  setErrors: (errors: Record<string, string>) => void
): boolean => {
  const requiredFields: Array<keyof IWebinarData> = [
    "instructorName",
    "instructorRole",
    "instructorCompany",
    "topic",
    "webinarTitle",
    "startDate",
    "startTime",
    "endTime",
  ];

  const tempErrors: Record<string, string> = requiredFields.reduce(
    (acc, field) => {
      const fieldValue = formValues[field];

      // Check if the field is a string before applying replace to avoid TypeScript warnings
      const fieldLabel =
        typeof field === "string"
          ? field.replace(/([A-Z])/g, " $1").trim()
          : String(field);

      acc[field] = fieldValue ? "" : `${fieldLabel} is required.`;
      return acc;
    },
    {} as Record<string, string>
  );

  // Validate startTime and endTime
  if (formValues.startTime && formValues.endTime) {
    const start = new Date(`1970-01-01T${formValues.startTime}:00`);
    const end = new Date(`1970-01-01T${formValues.endTime}:00`);
    if (start >= end) {
      tempErrors.endTime = "End time must be after start time.";
    }
  }

  // Validate startDate is not less than today's date
  if (formValues.startDate) {
    const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    if (formValues.startDate < today) {
      tempErrors.startDate = "Start date cannot be in the past.";
    }
  }

  setErrors(tempErrors);
  // Return true if there are no errors
  return !Object.values(tempErrors).some(Boolean);
};
