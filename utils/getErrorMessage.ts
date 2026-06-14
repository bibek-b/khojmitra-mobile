export const getErrorMessage = (error: any): string => {
  const message =
    error?.response?.data?.message ||
    "Oops! Something went wrong. Please try again";
  return message;
};
