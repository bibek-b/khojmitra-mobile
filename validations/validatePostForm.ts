export const validatePostForm = (formData: { [key: string]: any }) => {
  const errors: { [key: string]: string } = {};
  const { title, category, type, location, description} =
    formData;

  if (!title) errors.title = "Please input item title.";

  if (title.trim().length < 3)
    errors.title = "Title should be at least 3 chars.";
  else if (title.trim().length > 50)
    errors.title = "Title can be up to 50 chars or fewer.";

  if (!category) errors.category = "Please select item category.";

  if (!type) errors.type = "Please select post type.";

  if (!location) errors.location = "Please input item location.";

  if (location.trim().length < 3)
    errors.location = "Location should be at least 3 chars.";
  else if (location.trim().length > 50)
    errors.location = "Location can be up to 50 chars or fewer.";

  if (!description) errors.description = "Please input description.";

  if (description.trim().length < 10)
    errors.description = "Description should be at least 10 chars.";
  else if (description.trim().length > 500)
    errors.description = "Description can be up to 500 chars or fewer.";

  return errors;
};
