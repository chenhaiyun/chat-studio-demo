import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="fixed top-0 left-0 h-screen w-16 bg-gray-900 flex flex-col items-center py-4">
      <div className="mb-8">
        <Link to="/" className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        </Link>
      </div>
      
      {/* Navigation links */}
      <div className="flex flex-col items-center space-y-6">
        <Link 
          to="/" 
          className={`${currentPath === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
        <Link 
          to="/projects" 
          className={`${currentPath === '/projects' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
