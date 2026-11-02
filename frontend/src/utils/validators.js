// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).trim());
};

// Validate password length
export const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 8;
};

// Check whether a required field is empty
export const isRequired = (value) => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return value !== null && value !== undefined && value !== "";
};

// Validate phone number (10 digits)
export const isValidPhone = (phone) => {
  return /^[6-9]\d{9}$/.test(String(phone).trim());
};

// Validate age (between 1 and 18)
export const isValidAge = (age) => {
  const number = Number(age);
  return Number.isInteger(number) && number >= 1 && number <= 18;
};

// Validate date
export const isValidDate = (date) => {
  return !Number.isNaN(Date.parse(date));
};