import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Application from "./pages/application";

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/app" element={<Application />} />
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}
