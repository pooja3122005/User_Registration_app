/**
 * Cloudinary Service
 * Handles image uploads to Cloudinary
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload image to Cloudinary
 * @param {File} file - Image file to upload
 * @returns {Promise<Object>} - Upload response with URL
 */
export const uploadImage = async (file) => {
  try {
    // Validate file
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPG and PNG are allowed.');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Upload failed');
    }

    const data = await response.json();

    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Generate thumbnail URL from Cloudinary URL
 * @param {string} url - Original Cloudinary URL
 * @param {number} width - Thumbnail width
 * @param {number} height - Thumbnail height
 * @returns {string} - Thumbnail URL
 */
export const getThumbnailUrl = (url, width = 300, height = 300) => {
  if (!url) return '';
  
  // Insert transformation parameters into Cloudinary URL
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/w_${width},h_${height},c_fill,q_auto,f_auto/${parts[1]}`;
  }
  
  return url;
};

/**
 * Delete image from Cloudinary (requires backend implementation for security)
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<Object>} - Delete response
 */
export const deleteImage = async (publicId) => {
  // Note: This requires a backend endpoint for security
  // Cloudinary API secret should never be exposed in frontend
  console.warn('Delete operation requires backend implementation');
  throw new Error('Delete operation not implemented');
};