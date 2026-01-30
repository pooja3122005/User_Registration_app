// import React from 'react';
// import { MapPin, Calendar, ArrowRight } from 'lucide-react';

// /**
//  * SubmissionCard Component
//  * Displays a summary of a user submission in the dashboard grid
//  */
// const SubmissionCard = ({ submission, onClick }) => {
//   const { name, description, photoUrl, location, createdAt } = submission;

//   // Format date if it's a Firestore timestamp or JS Date
//   const formatDate = (date) => {
//     if (!date) return 'Unknown date';
//     const d = date.toDate ? date.toDate() : new Date(date);
//     return d.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div 
//       className="card overflow-hidden cursor-pointer group flex flex-col h-full"
//       onClick={() => onClick(submission)}
//     >
//       {/* Photo Preview */}
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={photoUrl}
//           alt={name}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
//       </div>

//       {/* Content */}
//       <div className="p-5 flex flex-col flex-grow">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//             {name}
//           </h3>
//         </div>

//         <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
//           {description}
//         </p>

//         <div className="space-y-2 pt-4 border-t border-gray-100">
//           <div className="flex items-center text-gray-500 text-xs">
//             <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
//             <span className="truncate">{location}</span>
//           </div>
//           <div className="flex items-center text-gray-500 text-xs">
//             <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
//             <span>{formatDate(createdAt)}</span>
//           </div>
//         </div>

//         <div className="mt-4 flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
//           View Details
//           <ArrowRight className="w-4 h-4 ml-1" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmissionCard;


import React from 'react';
import { MapPin, Calendar, ArrowRight, Eye } from 'lucide-react';

/**
 * SubmissionCard Component
 * Displays a summary of a user submission with modern, attractive design
 */
const SubmissionCard = ({ submission, onClick }) => {
  const { name, description, photoUrl, location, createdAt } = submission;

  // Format date
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
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
      onClick={() => onClick(submission)}
    >
      {/* Photo Preview with Gradient Overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={photoUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
        
        {/* Floating badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="flex items-center gap-1.5 text-primary-600">
            <Eye className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">View</span>
          </div>
        </div>

        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-0 group-hover:translate-y-1 transition-transform duration-300">
          <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
            {name}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 min-h-[3.75rem]">
          {description}
        </p>

        {/* Metadata Section */}
        <div className="space-y-2.5 pt-4 border-t border-gray-100">
          {/* Location */}
          <div className="flex items-center group/item">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 mr-3 group-hover/item:scale-110 transition-transform duration-300">
              <MapPin className="w-4 h-4 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium mb-0.5">Location</p>
              <p className="text-sm text-gray-900 font-semibold truncate">{location}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center group/item">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 mr-3 group-hover/item:scale-110 transition-transform duration-300">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium mb-0.5">Submitted</p>
              <p className="text-sm text-gray-900 font-semibold">{formatDate(createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-primary-600 font-semibold text-sm">
            <span className="group-hover:text-primary-700 transition-colors">View Full Details</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default SubmissionCard;
