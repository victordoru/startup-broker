import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="text-xl font-bold hover:text-blue-600 text-gray-800"
              >
                My App
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

