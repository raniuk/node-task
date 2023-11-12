export function validateData(title, description) {
  let errorMessages = [];

  if (!title) {
    errorMessages.push({ message: "Title is required" });
  }

  if (!description) {
    errorMessages.push({ message: "Description is required" });
  }

  return errorMessages;
}
