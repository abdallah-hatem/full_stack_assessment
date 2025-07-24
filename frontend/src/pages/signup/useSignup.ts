import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { formFieldsType } from "../../components/form/formComp";
import { validatePassword } from "../../utils/validators";
import { REGISTER } from "../../apis";
import type { RegisterData } from "../../types/authTypes";
import { setCookie } from "../../services/cookies";

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
}

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formFields: formFieldsType = [
    {
      name: "email",
      type: "input",
      label: "Email",
      required: true,
      rules: [
        { required: true, message: "Please input your email" },
        { type: "email", message: "Please enter a valid email format" },
      ],
      innerProps: {
        placeholder: "Enter your email",
        type: "email",
        size: "large",
      },
    },
    {
      name: "name",
      type: "input",
      label: "Name",
      required: true,
      rules: [
        { required: true, message: "Please input your name" },
        { min: 3, message: "Name must be at least 3 characters long" },
      ],
      innerProps: {
        placeholder: "Enter your name",
        size: "large",
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      rules: [{ validator: validatePassword }],
      innerProps: {
        placeholder: "Enter your password",
        size: "large",
      },
    },
  ];

  const onFinish = (data: SignUpFormData) => {
    setLoading(true);

    REGISTER({ data: data as RegisterData })
      .then((response) => {
        if (!response.success) return;

        // Navigate to application page after successful signup
        navigate("/signin");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    formFields,
    onFinish,
  };
};
