import React from "react";
import ButtonComp from "../../components/functional/buttonComp";
import { useApplication } from "./useApplication";

const Application: React.FC = () => {
  const { handleLogout } = useApplication();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome to the application.
              </h1>
              <ButtonComp 
                onClick={handleLogout}
                types="ghost"
                className="text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 px-4 py-2 rounded-md transition duration-200"
              >
                Logout
              </ButtonComp>
            </div>
            
            <div className="text-gray-600">
              <p className="text-lg mb-4">
                You have successfully signed in! This is your main application dashboard.
              </p>
              <p>
                You can now start using the application features. Use the logout button above to end your session when you're done.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application; 