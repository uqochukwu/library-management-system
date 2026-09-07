const validateMember = (values) => {
  const errors = {};

  if (!values.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  return errors;
};

export default validateMember