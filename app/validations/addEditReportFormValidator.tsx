import { AddEditReportFormTypes } from "@/types/theme";

 const AddEditReportFormValidator = ({
  checkedValue,
  title,
  selCategory,
  location,
  date,
  description,
}: AddEditReportFormTypes) => {
    if(!checkedValue || !title || !selCategory || !location || !date || !description) {
        return { valid: false, message: "Please fill all the fields."}
    }
    if(title.trim().length > 20) {
        return { valid: false, message: "Title can be up to 25 chars or fewer."}
    }
    if(location.trim().length > 50) {
        return { valid: false, message: "Location can be up to 50 chars or fewer."}
    }
    if(description.trim().length > 200) {
        return { valid: false, message: "Descripton can be up to 200 chars or fewer."}
    }
};

export default AddEditReportFormValidator;
