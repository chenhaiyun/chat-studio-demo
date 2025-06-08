import React, { useEffect } from 'react';
import { LAST_VISIT_URL } from 'src/assets/utils';

const LoginCallback: React.FC = () => {
  const gotoBasePage = () => {
    const lastVisitUrl = localStorage.getItem(LAST_VISIT_URL) ?? '/';
    localStorage.removeItem(LAST_VISIT_URL);
    window.location.href = `${lastVisitUrl}`;
  };

  useEffect(() => {
    gotoBasePage();
  }, []);
  return (
    <div className="page-loading">
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold mr-3">
              CS
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Chat Studio</h2>
          </div>
          <div className="flex justify-center space-x-2 px-4 py-2">
            <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCallback;
