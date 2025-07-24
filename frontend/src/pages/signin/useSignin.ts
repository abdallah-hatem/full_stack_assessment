import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { formFieldsType } from "../../components/form/formComp";
import { validateEmail } from "../../utils/validators";

interface SignInFormData {
  email: string;
  password: string;
}

export const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formFields: formFieldsType = [
    {
      name: "email",
      type: "input",
      label: "Email",
      required: true,
      rules: [
        { validator: validateEmail }
      ],
      innerProps: {
        placeholder: "Enter your email",
        type: "email",
        size: "large",
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      innerProps: {
        placeholder: "Enter your password",
        size: "large",
      },
    },
  ];

  const onFinish = (data: SignInFormData) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Sign in data:", data);
      setLoading(false);
      // Navigate to application page after successful signin
      navigate("/app");
    }, 1000);
  };

  return {
    loading,
    formFields,
    onFinish,
  };
}; 