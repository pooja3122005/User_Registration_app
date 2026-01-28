import React from 'react';
import { X, MapPin, Calendar, Globe } from 'lucide-react';

/**
 * SubmissionDetail Component
 * Displays full details of a submission in a modal
 */
const SubmissionDetail = ({ submission, onClose }) => {
  if (!submission) return null;

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">Submission Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <img
              src={submission.photoUrl}
              alt={submission.name}
              className="w-full h-auto max-h-[500px] object-contain bg-gray-100"
            />
          </div>

          {/* Name */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Name
            </h3>
            <p className="text-2xl font-bold text-gray-900">{submission.name}</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Description
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {submission.description}
              </p>
            </div>
          </div>

          {/* Location Information */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Location Information
            </h3>
            <div className="space-y-3">
              {/* Location */}
              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Address</p>
                  <p className="text-gray-900">{submission.location}</p>
                </div>
              </div>

              {/* Coordinates */}
              {submission.coordinates && (
                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <Globe className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-1">Coordinates</p>
                    <p className="text-gray-900 font-mono text-sm">
                      {submission.coordinates.latitude.toFixed(6)}, {submission.coordinates.longitude.toFixed(6)}
                    </p>
                    <a
                      href={`https://www.google.com/maps?q=${submission.coordinates.latitude},${submission.coordinates.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Submission Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Submitted Date */}
              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <Calendar className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Submitted</p>
                  <p className="text-gray-900 text-sm">{formatDate(submission.createdAt)}</p>
                </div>
              </div>

              {/* ID */}
              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="w-5 h-5 flex items-center justify-center text-primary-600 mt-0.5 flex-shrink-0">
                  <span className="text-sm font-bold">#</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Submission ID</p>
                  <p className="text-gray-900 text-sm font-mono truncate">{submission.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;