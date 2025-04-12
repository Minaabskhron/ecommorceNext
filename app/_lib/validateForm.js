export const validateField = (fieldName, value, formData) => {
  const EGYPT_PHONE_REGEX = /^(?:\+20|0)?(1[0-9]{9}|2[0-9]{8,9}|5[0-9]{8})$/;

  switch (fieldName) {
    case "name":
      if (!value.trim()) return "Name is required";
      break;
    case "email":
      if (!value.trim()) return "Email is required";
      if (!value.includes("@")) return "Email must be valid";
      break;
    case "phone":
      if (!value.trim()) return "Phone is required";
      if (!EGYPT_PHONE_REGEX.test(value)) return "Invalid phone number";
      break;
    case "password":
      if (!value.trim()) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      break;
    case "rePassword":
      if (!value.trim()) return "Please confirm password";
      if (value !== formData.password) return "Passwords must match";
      break;
    default:
      return "";
  }
  return "";
};
