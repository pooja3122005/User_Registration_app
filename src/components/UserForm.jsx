import React, { useState } from 'react';
import { Upload, MapPin, Check, AlertCircle, X } from 'lucide-react';
import { uploadImage } from '../services/cloudinaryService';
import { createSubmission } from '../services/firestoreService';
import {
  validateName,
  validateDescription,
  validateImage,
  validateLocation,
  validateCoordinates,
  formatFileSize
} from '../utils/validation';
import Loader from './Loader';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    coordinates: null
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate image
    const error = validateImage(file);
    if (error) {
      setErrors(prev => ({ ...prev, image: error }));
      return;
    }

    setImageFile(file);
    setErrors(prev => ({ ...prev, image: null }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove selected image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setErrors(prev => ({ ...prev, image: null }));
  };

  // Get user's location using Geolocation API
  const getLocation = () => {
    if (!navigator.geolocation) {
      setErrors(prev => ({ 
        ...prev, 
        location: 'Geolocation is not supported by your browser' 
      }));
      return;
    }

    setIsLoadingLocation(true);
    setErrors(prev => ({ ...prev, location: null }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding using a free API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          // Extract city and state/country
          const city = data.address.city || data.address.town || data.address.village || '';
          const state = data.address.state || '';
          const country = data.address.country || '';
          
          const locationString = [city, state, country]
            .filter(Boolean)
            .join(', ');

          setFormData(prev => ({
            ...prev,
            location: locationString,
            coordinates: { latitude, longitude }
          }));
        } catch (error) {
          console.error('Geocoding error:', error);
          // Fallback to coordinates if geocoding fails
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            coordinates: { latitude, longitude }
          }));
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        setIsLoadingLocation(false);
        let errorMessage = 'Unable to retrieve your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        
        setErrors(prev => ({ ...prev, location: errorMessage }));
      }
    );
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const descError = validateDescription(formData.description);
    if (descError) newErrors.description = descError;

    const imageError = validateImage(imageFile);
    if (imageError) newErrors.image = imageError;

    const locError = validateLocation(formData.location);
    if (locError) newErrors.location = locError;

    if (formData.coordinates) {
      const coordError = validateCoordinates(
        formData.coordinates.latitude,
        formData.coordinates.longitude
      );
      if (coordError) newErrors.coordinates = coordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Validate form
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors above' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image to Cloudinary
      const uploadResult = await uploadImage(imageFile);

      // Prepare submission data
      const submissionData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        photoUrl: uploadResult.url,
        photoPublicId: uploadResult.publicId,
        coordinates: formData.coordinates || null
      };

      // Save to Firestore
      await createSubmission(submissionData);

      // Show success message
      setSubmitStatus({ 
        type: 'success', 
        message: 'Registration submitted successfully!' 
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        location: '',
        coordinates: null
      });
      setImageFile(null);
      setImagePreview(null);
      setErrors({});

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to submit registration. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            User Registration
          </h1>
          <p className="text-gray-600">
            Fill out the form below to complete your registration
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start ${
              submitStatus.type === 'success'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {submitStatus.type === 'success' ? (
              <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            )}
            <p
              className={`text-sm font-medium ${
                submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {submitStatus.message}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-8">
          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="form-label">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="form-label">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="5"
              className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Tell us about yourself..."
              disabled={isSubmitting}
            />
            <div className="flex justify-between mt-1">
              {errors.description ? (
                <p className="error-text">{errors.description}</p>
              ) : (
                <p className="text-sm text-gray-500">
                  {formData.description.length}/1000 characters
                </p>
              )}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="form-label">
              Photo <span className="text-red-500">*</span>
            </label>
            
            {!imagePreview ? (
              <div className="mt-1">
                <label
                  htmlFor="photo"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">JPG or PNG (MAX. 5MB)</p>
                  </div>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleImageChange}
                    disabled={isSubmitting}
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  disabled={isSubmitting}
                >
                  <X className="w-4 h-4" />
                </button>
                {imageFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    {imageFile.name} ({formatFileSize(imageFile.size)})
                  </p>
                )}
              </div>
            )}
            
            {errors.image && <p className="error-text mt-2">{errors.image}</p>}
          </div>

          {/* Location Field */}
          <div className="mb-8">
            <label htmlFor="location" className="form-label">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`input-field ${errors.location ? 'border-red-500' : ''}`}
                placeholder="City, State or use auto-detect"
                disabled={isSubmitting || isLoadingLocation}
              />
              <button
                type="button"
                onClick={getLocation}
                disabled={isSubmitting || isLoadingLocation}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              >
                <MapPin className="w-4 h-4" />
                {isLoadingLocation ? 'Detecting...' : 'Auto-detect'}
              </button>
            </div>
            {errors.location && <p className="error-text">{errors.location}</p>}
            {formData.coordinates && (
              <p className="text-xs text-gray-500 mt-1">
                Coordinates: {formData.coordinates.latitude.toFixed(4)}, {formData.coordinates.longitude.toFixed(4)}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader size="small" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>Submit Registration</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          All fields marked with <span className="text-red-500">*</span> are required
        </p>
      </div>
    </div>
  );
};

export default UserForm;