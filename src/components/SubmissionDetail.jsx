// import React from 'react';
// import { X, MapPin, Calendar, Globe } from 'lucide-react';

// /**
//  * SubmissionDetail Component
//  * Displays full details of a submission in a modal
//  */
// const SubmissionDetail = ({ submission, onClose }) => {
//   if (!submission) return null;

//   // Format date
//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     return new Date(date).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Handle backdrop click
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
//       onClick={handleBackdropClick}
//     >
//       <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
//           <h2 className="text-2xl font-bold text-gray-900">Submission Details</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             aria-label="Close"
//           >
//             <X className="w-6 h-6 text-gray-600" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Image */}
//           <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
//             <img
//               src={submission.photoUrl}
//               alt={submission.name}
//               className="w-full h-auto max-h-[500px] object-contain bg-gray-100"
//             />
//           </div>

//           {/* Name */}
//           <div className="mb-6">
//             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
//               Name
//             </h3>
//             <p className="text-2xl font-bold text-gray-900">{submission.name}</p>
//           </div>

//           {/* Description */}
//           <div className="mb-6">
//             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
//               Description
//             </h3>
//             <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//               <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
//                 {submission.description}
//               </p>
//             </div>
//           </div>

//           {/* Location Information */}
//           <div className="mb-6">
//             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
//               Location Information
//             </h3>
//             <div className="space-y-3">
//               {/* Location */}
//               <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
//                 <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-700 mb-1">Address</p>
//                   <p className="text-gray-900">{submission.location}</p>
//                 </div>
//               </div>

//               {/* Coordinates */}
//               {submission.coordinates && (
//                 <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
//                   <Globe className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-700 mb-1">Coordinates</p>
//                     <p className="text-gray-900 font-mono text-sm">
//                       {submission.coordinates.latitude.toFixed(6)}, {submission.coordinates.longitude.toFixed(6)}
//                     </p>
//                     <a
//                       href={`https://www.google.com/maps?q=${submission.coordinates.latitude},${submission.coordinates.longitude}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block"
//                     >
//                       View on Google Maps →
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Metadata */}
//           <div className="mb-6">
//             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
//               Submission Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Submitted Date */}
//               <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
//                 <Calendar className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-700 mb-1">Submitted</p>
//                   <p className="text-gray-900 text-sm">{formatDate(submission.createdAt)}</p>
//                 </div>
//               </div>

//               {/* ID */}
//               <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
//                 <div className="w-5 h-5 flex items-center justify-center text-primary-600 mt-0.5 flex-shrink-0">
//                   <span className="text-sm font-bold">#</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700 mb-1">Submission ID</p>
//                   <p className="text-gray-900 text-sm font-mono truncate">{submission.id}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
//           <button
//             onClick={onClose}
//             className="w-full btn-secondary"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmissionDetail;


import React from 'react';
import { X, MapPin, Calendar, Globe, Image as ImageIcon, FileText, Hash } from 'lucide-react';

/**
 * SubmissionDetail Component
 * Displays full details of a submission in an attractive modal
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

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 zoom-in-95 duration-500">
        {/* Header with Gradient */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 via-primary-500 to-purple-600 px-8 py-6 flex items-center justify-between z-10 shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Submission Details</h2>
            <p className="text-primary-100 text-sm">Complete information about this entry</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-white/20 rounded-xl transition-all duration-300 group hover:scale-110"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-8">
            {/* Image Section */}
            <div className="mb-8 group/image">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Photo</h3>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100 group-hover/image:border-primary-200 transition-colors duration-300">
                <img
                  src={submission.photoUrl}
                  alt={submission.name}
                  className="w-full h-auto max-h-[500px] object-contain bg-gradient-to-br from-gray-50 to-gray-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Name Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Name</h3>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-2xl p-6">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {submission.name}
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Description</h3>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 rounded-2xl p-6 shadow-inner">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">
                  {submission.description}
                </p>
              </div>
            </div>

            {/* Location Information */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Location Information</h3>
              </div>
              <div className="space-y-4">
                {/* Address */}
                <div className="group/loc bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl group-hover/loc:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-green-600 uppercase tracking-wide mb-2">Address</p>
                      <p className="text-gray-900 text-lg font-semibold">{submission.location}</p>
                    </div>
                  </div>
                </div>

                {/* Coordinates */}
                {submission.coordinates && (
                  <div className="group/coord bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl group-hover/coord:scale-110 transition-transform duration-300">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">Coordinates</p>
                        <p className="text-gray-900 font-mono text-base font-semibold mb-3">
                          {submission.coordinates.latitude.toFixed(6)}, {submission.coordinates.longitude.toFixed(6)}
                        </p>
                        <a
                          href={`https://www.google.com/maps?q=${submission.coordinates.latitude},${submission.coordinates.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm bg-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-300 border border-blue-200"
                        >
                          <Globe className="w-4 h-4" />
                          View on Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Submission Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Submitted Date */}
                <div className="group/date bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl group-hover/date:scale-110 transition-transform duration-300">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-orange-600 uppercase tracking-wide mb-2">Submitted</p>
                      <p className="text-gray-900 text-sm font-semibold leading-relaxed">{formatDate(submission.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* ID */}
                <div className="group/id bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl group-hover/id:scale-110 transition-transform duration-300">
                      <Hash className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-violet-600 uppercase tracking-wide mb-2">Submission ID</p>
                      <p className="text-gray-900 text-xs font-mono font-semibold truncate">{submission.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200 px-8 py-5 shadow-lg">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-primary-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;

