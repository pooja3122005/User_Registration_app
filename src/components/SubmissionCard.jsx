import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

/**
 * SubmissionCard Component
 * Displays a summary of a user submission in the dashboard grid
 */
const SubmissionCard = ({ submission, onClick }) => {
  const { name, description, photoUrl, location, createdAt } = submission;

  // Format date if it's a Firestore timestamp or JS Date
  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="card overflow-hidden cursor-pointer group flex flex-col h-full"
      onClick={() => onClick(submission)}
    >
      {/* Photo Preview */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={photoUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {description}
        </p>

        <div className="space-y-2 pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-500 text-xs">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
          View Details
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
