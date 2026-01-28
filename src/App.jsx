import { useState } from 'react';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';
import { UserPlus, LayoutDashboard } from 'lucide-react';

function App() {
  const [view, setView] = useState('user'); // 'user' or 'admin'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">UserReg</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('user')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'user'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </button>
              <button
                onClick={() => setView('admin')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'admin'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Admin
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {view === 'user' ? (
          <UserForm />
        ) : (
          <AdminDashboard />
        )}
      </main>
    </div>
  );
}

export default App;
