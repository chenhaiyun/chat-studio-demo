import React from "react";
import { useAuth } from "react-oidc-context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import StudioPage from "./pages/StudioPage";
import ProjectsPage from "./pages/ProjectsPage";
import LoginCallback from "./components/LoginCallback";

const SignedInRouter = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/signin" element={<LoginCallback />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/studio/:projectId" element={<StudioPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const AppRouter: React.FC = () => {
  const auth = useAuth();
  if (auth.isLoading) {
    return (
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
    );
  }

  if ((!auth.isAuthenticated && auth.user) || auth.error) {
    return (
      <>
        {/* <ReSignIn /> */}
        <SignedInRouter />
      </>
    );
  }

  if (auth.isAuthenticated) {
    return <SignedInRouter />;
  }

  return (
    <div className="login-container flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            CS
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Chat Studio</h1>
          <p className="text-gray-600 mb-6">Sign in to access your projects</p>
        </div>
        <div className="text-center">
          <button 
            onClick={() => void auth.signinRedirect()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm5 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm4-1a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppRouter;
