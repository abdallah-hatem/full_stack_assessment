import React from "react";
import { Link } from "react-router-dom";
import FormComp from "../../components/form/formComp";
import { useSignup } from "./useSignup";

const SignUp: React.FC = () => {
  const { loading, formFields, onFinish } = useSignup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Create Account
            </h2>
            <p className="text-indigo-100 text-center mt-2">
              Join us and start your journey
            </p>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            <FormComp
              fileds={formFields}
              showSubmit
              submitStyleTw="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              submitText="Create Account"
              onFinish={onFinish}
              loadingButton={loading}
              layout="vertical"
            />
          </div>

          {/* Footer Section */}
          <div className="px-8 pb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link
                to="/signin"
                className="inline-flex items-center px-6 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a> and{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 