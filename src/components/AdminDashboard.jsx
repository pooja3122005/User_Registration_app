// import React, { useState, useEffect } from 'react';
// import { RefreshCw, AlertCircle, Users, Database } from 'lucide-react';
// import { getAllSubmissions } from '../services/firestoreService';
// import SubmissionCard from './SubmissionCard';
// import SubmissionDetail from './SubmissionDetail';
// import Loader from './Loader';

// /**
//  * AdminDashboard Component
//  * Displays all user submissions in a grid layout
//  */
// const AdminDashboard = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSubmission, setSelectedSubmission] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // Fetch submissions
//   const fetchSubmissions = async (showRefreshIndicator = false) => {
//     try {
//       if (showRefreshIndicator) {
//         setIsRefreshing(true);
//       } else {
//         setIsLoading(true);
//       }
//       setError(null);

//       const data = await getAllSubmissions();
//       setSubmissions(data);
//     } catch (err) {
//       console.error('Error fetching submissions:', err);
//       setError(err.message || 'Failed to load submissions');
//     } finally {
//       setIsLoading(false);
//       setIsRefreshing(false);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   // Handle submission click
//   const handleSubmissionClick = (submission) => {
//     setSelectedSubmission(submission);
//   };

//   // Handle refresh
//   const handleRefresh = () => {
//     fetchSubmissions(true);
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader text="Loading submissions..." size="large" />
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
//             <AlertCircle className="w-8 h-8 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button onClick={() => fetchSubmissions()} className="btn-primary">
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">
//                 Admin Dashboard
//               </h1>
//               <p className="text-gray-600">
//                 Review and manage all user submissions
//               </p>
//             </div>
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="btn-primary flex items-center gap-2 w-fit"
//             >
//               <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
//               <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//             <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white shadow-lg">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-primary-100 text-sm font-medium mb-1">
//                     Total Submissions
//                   </p>
//                   <p className="text-3xl font-bold">{submissions.length}</p>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-lg">
//                   <Users className="w-8 h-8" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-100 text-sm font-medium mb-1">
//                     Database Status
//                   </p>
//                   <p className="text-xl font-bold">Connected</p>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-lg">
//                   <Database className="w-8 h-8" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg sm:col-span-2 lg:col-span-1">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-100 text-sm font-medium mb-1">
//                     Last Updated
//                   </p>
//                   <p className="text-xl font-bold">
//                     {new Date().toLocaleTimeString('en-US', { 
//                       hour: '2-digit', 
//                       minute: '2-digit' 
//                     })}
//                   </p>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-lg">
//                   <RefreshCw className="w-8 h-8" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Empty State */}
//         {submissions.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
//               <Users className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No Submissions Yet
//             </h3>
//             <p className="text-gray-600 mb-6">
//               User submissions will appear here once they register
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Submissions Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {submissions.map((submission) => (
//                 <SubmissionCard
//                   key={submission.id}
//                   submission={submission}
//                   onClick={handleSubmissionClick}
//                 />
//               ))}
//             </div>

//             {/* Results Count */}
//             <div className="mt-8 text-center">
//               <p className="text-gray-600">
//                 Showing {submissions.length} {submissions.length === 1 ? 'submission' : 'submissions'}
//               </p>
//             </div>
//           </>
//         )}

//         {/* Detail Modal */}
//         {selectedSubmission && (
//           <SubmissionDetail
//             submission={selectedSubmission}
//             onClose={() => setSelectedSubmission(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, Users, Database, TrendingUp, Clock } from 'lucide-react';
import { getAllSubmissions } from '../services/firestoreService';
import SubmissionCard from './SubmissionCard';
import SubmissionDetail from './SubmissionDetail';
import Loader from './Loader';

/**
 * AdminDashboard Component
 * Displays all user submissions with modern, attractive UI
 */
const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch submissions
  const fetchSubmissions = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const data = await getAllSubmissions();
      setSubmissions(data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError(err.message || 'Failed to load submissions');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Handle submission click
  const handleSubmissionClick = (submission) => {
    setSelectedSubmission(submission);
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchSubmissions(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <Loader text="Loading submissions..." size="large" />
          <p className="mt-4 text-gray-600 text-sm animate-pulse">Please wait while we fetch the data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-6 shadow-2xl animate-bounce">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-8 text-lg">{error}</p>
          <button 
            onClick={() => fetchSubmissions()} 
            className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Review and manage all user submissions with ease
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 w-fit disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Submissions */}
            <div className="group bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-primary-100 text-sm font-semibold mb-1 uppercase tracking-wide">
                      Total Submissions
                    </p>
                    <p className="text-5xl font-extrabold">{submissions.length}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Users className="w-10 h-10" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary-100 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>All time records</span>
                </div>
              </div>
            </div>

            {/* Database Status */}
            <div className="group bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-green-100 text-sm font-semibold mb-1 uppercase tracking-wide">
                      Database Status
                    </p>
                    <p className="text-2xl font-extrabold">Connected</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Database className="w-10 h-10" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse" />
                  <span className="text-green-100 text-sm">Live & Operational</span>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="group bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-purple-100 text-sm font-semibold mb-1 uppercase tracking-wide">
                      Last Updated
                    </p>
                    <p className="text-2xl font-extrabold">
                      {new Date().toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Clock className="w-10 h-10" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-purple-100 text-sm">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Real-time sync</span>
                </div>
              </div>
            </div>

            {/* Average Info Card */}
            <div className="group bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-orange-100 text-sm font-semibold mb-1 uppercase tracking-wide">
                      Quick Stats
                    </p>
                    <p className="text-2xl font-extrabold">Active</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <TrendingUp className="w-10 h-10" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-orange-100 text-sm">
                  <span>Dashboard ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {submissions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border-2 border-dashed border-gray-300">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6 shadow-inner">
              <Users className="w-14 h-14 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              No Submissions Yet
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              User submissions will appear here once they complete the registration process
            </p>
            <button
              onClick={handleRefresh}
              className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Check for New Submissions
            </button>
          </div>
        ) : (
          <>
            {/* Submissions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {submissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  onClick={handleSubmissionClick}
                />
              ))}
            </div>

            {/* Results Count */}
            <div className="mt-12 text-center">
              <div className="inline-block bg-white rounded-full px-8 py-4 shadow-lg border border-gray-200">
                <p className="text-gray-700 font-semibold">
                  Showing <span className="text-primary-600 font-bold text-lg">{submissions.length}</span>{' '}
                  {submissions.length === 1 ? 'submission' : 'submissions'}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Detail Modal */}
        {selectedSubmission && (
          <SubmissionDetail
            submission={selectedSubmission}
            onClose={() => setSelectedSubmission(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

