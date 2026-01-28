import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, Users, Database } from 'lucide-react';
import { getAllSubmissions } from '../services/firestoreService';
import SubmissionCard from './SubmissionCard';
import SubmissionDetail from './SubmissionDetail';
import Loader from './Loader';

/**
 * AdminDashboard Component
 * Displays all user submissions in a grid layout
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading submissions..." size="large" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => fetchSubmissions()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Review and manage all user submissions
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="btn-primary flex items-center gap-2 w-fit"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-100 text-sm font-medium mb-1">
                    Total Submissions
                  </p>
                  <p className="text-3xl font-bold">{submissions.length}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <Users className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">
                    Database Status
                  </p>
                  <p className="text-xl font-bold">Connected</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <Database className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">
                    Last Updated
                  </p>
                  <p className="text-xl font-bold">
                    {new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <RefreshCw className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {submissions.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Submissions Yet
            </h3>
            <p className="text-gray-600 mb-6">
              User submissions will appear here once they register
            </p>
          </div>
        ) : (
          <>
            {/* Submissions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  onClick={handleSubmissionClick}
                />
              ))}
            </div>

            {/* Results Count */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Showing {submissions.length} {submissions.length === 1 ? 'submission' : 'submissions'}
              </p>
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