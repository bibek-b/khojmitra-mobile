export const validateReportForm = (formData: { [key: string]: any }) => {
  const errors: { [key: string]: string } = {};
  const { title, selCategory, checkedValue, location, description } = formData;

  if (!title) errors.title = "Please input item title.";
  if (title.trim().length > 25)
    errors.title = "Title can be up to 25 chars or fewer.";
  if (!selCategory) errors.selCategory = "Please select item category.";
  if (!checkedValue) errors.checkedValue = "Please select report type.";
  if (!location) errors.location = "Please input item location.";
  if (location.trim().length > 50)
    errors.location = "Location can be up to 50 chars or fewer.";
  if (!description) errors.description = "Please input description.";
  if (description.trim().length > 200)
    errors.description = "Description can be up to 200 chars or fewer.";
  return errors;
};
