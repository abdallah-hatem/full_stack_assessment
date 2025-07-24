/**
 * Validation utilities for form fields
 */

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Password validation function for Ant Design Form
 * Requirements:
 * - Minimum length of 8 characters
 * - At least one letter
 * - At least one number
 * - At least one special character
 */
export const validatePassword = (_: any, value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error("Please input your password"));
  }
  
  const minLength = value.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  if (!minLength) {
    return Promise.reject(new Error("Password must be at least 8 characters long"));
  }
  if (!hasLetter) {
    return Promise.reject(new Error("Password must contain at least one letter"));
  }
  if (!hasNumber) {
    return Promise.reject(new Error("Password must contain at least one number"));
  }
  if (!hasSpecialChar) {
    return Promise.reject(new Error("Password must contain at least one special character"));
  }

  return Promise.resolve();
};

/**
 * Password strength checker (returns detailed feedback)
 */
export const checkPasswordStrength = (password: string): ValidationResult & { strength: 'weak' | 'medium' | 'strong' } => {
  if (!password) {
    return { isValid: false, message: "Password is required", strength: 'weak' };
  }

  const minLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  const criteriaMet = [minLength, hasLetter, hasNumber, hasSpecialChar, hasUpperCase, hasLowerCase].filter(Boolean).length;

  if (criteriaMet < 4) {
    return { isValid: false, message: "Password is too weak", strength: 'weak' };
  } else if (criteriaMet < 6) {
    return { isValid: true, message: "Password strength: Medium", strength: 'medium' };
  } else {
    return { isValid: true, message: "Password strength: Strong", strength: 'strong' };
  }
};

/**
 * Email validation function for Ant Design Form
 */
export const validateEmail = (_: any, value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error("Please input your email"));
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(value)) {
    return Promise.reject(new Error("Please enter a valid email address"));
  }

  return Promise.resolve();
};

/**
 * Name validation function for Ant Design Form
 */
export const validateName = (minLength: number = 3) => (_: any, value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error("Please input your name"));
  }

  if (value.trim().length < minLength) {
    return Promise.reject(new Error(`Name must be at least ${minLength} characters long`));
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(value)) {
    return Promise.reject(new Error("Name can only contain letters, spaces, hyphens, and apostrophes"));
  }

  return Promise.resolve();
};

/**
 * Phone number validation function
 */
export const validatePhoneNumber = (_: any, value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error("Please input your phone number"));
  }

  // Basic phone number regex (supports various formats)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  
  if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
    return Promise.reject(new Error("Please enter a valid phone number"));
  }

  return Promise.resolve();
};

/**
 * URL validation function
 */
export const validateUrl = (_: any, value: string): Promise<void> => {
  if (!value) {
    return Promise.resolve(); // Optional field
  }

  try {
    new URL(value);
    return Promise.resolve();
  } catch {
    return Promise.reject(new Error("Please enter a valid URL"));
  }
};

/**
 * Confirm password validation function
 */
export const validateConfirmPassword = (passwordFieldName: string = 'password') => 
  (form: any) => (_: any, value: string): Promise<void> => {
    if (!value) {
      return Promise.reject(new Error("Please confirm your password"));
    }

    const password = form.getFieldValue(passwordFieldName);
    if (value !== password) {
      return Promise.reject(new Error("Passwords do not match"));
    }

    return Promise.resolve();
  }; 