/**
 * Validation Utilities
 * Provides form validation functions
 */

/**
 * Validate name field
 * @param {string} name - Name to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (name.trim().length > 100) {
    return 'Name must not exceed 100 characters';
  }
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }
  
  return null;
};

/**
 * Validate description field
 * @param {string} description - Description to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateDescription = (description) => {
  if (!description || description.trim().length === 0) {
    return 'Description is required';
  }
  
  if (description.trim().length < 10) {
    return 'Description must be at least 10 characters long';
  }
  
  if (description.trim().length > 1000) {
    return 'Description must not exceed 1000 characters';
  }
  
  return null;
};

/**
 * Validate image file
 * @param {File} file - Image file to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateImage = (file) => {
  if (!file) {
    return 'Photo is required';
  }
  
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!validTypes.includes(file.type)) {
    return 'Only JPG and PNG images are allowed';
  }
  
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return 'Image size must not exceed 5MB';
  }
  
  return null;
};

/**
 * Validate location field
 * @param {string} location - Location to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateLocation = (location) => {
  if (!location || location.trim().length === 0) {
    return 'Location is required';
  }
  
  if (location.trim().length < 3) {
    return 'Location must be at least 3 characters long';
  }
  
  if (location.trim().length > 200) {
    return 'Location must not exceed 200 characters';
  }
  
  return null;
};

/**
 * Validate coordinates
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {string|null} - Error message or null if valid
 */
export const validateCoordinates = (latitude, longitude) => {
  if (latitude === undefined || longitude === undefined) {
    return 'Invalid coordinates';
  }
  
  if (latitude < -90 || latitude > 90) {
    return 'Invalid latitude';
  }
  
  if (longitude < -180 || longitude > 180) {
    return 'Invalid longitude';
  }
  
  return null;
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Sanitize string input
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};