import React from "react";
import ButtonComp from "../../components/functional/buttonComp";
import { useApplication } from "./useApplication";

const Application: React.FC = () => {
  const { handleLogout } = useApplication();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm sm:shadow rounded-lg">
          <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            {/* Header Section - Responsive */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Welcome to the application.
                </h1>
              </div>
              <div className="flex-shrink-0">
                <ButtonComp 
                  onClick={handleLogout}
                  types="ghost"
                  className="w-full sm:w-auto text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 px-4 py-2 rounded-md transition duration-200 text-sm sm:text-base"
                >
                  Logout
                </ButtonComp>
              </div>
            </div>
            
            {/* Content Section - Responsive */}
            <div className="text-gray-600 space-y-4">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                You have successfully signed in! This is your main application dashboard.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                You can now start using the application features. Use the logout button above to end your session when you're done.
              </p>
              
              {/* Additional Content Cards - Responsive Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Getting Started
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Explore the features and functionality available in your dashboard.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Your Profile
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Manage your account settings and personal information.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 md:col-span-2 lg:col-span-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Support
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Need help? Contact our support team for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application; 