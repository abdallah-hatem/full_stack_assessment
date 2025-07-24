import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { formFieldsType } from "../../components/form/formComp";
import { validateEmail } from "../../utils/validators";
import { LOGIN } from "../../apis";
import type { LoginData } from "../../types/authTypes";
import { setCookie } from "../../services/cookies";

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
      rules: [{ validator: validateEmail }],
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

    LOGIN({ data: data as LoginData })
      .then((response) => {
        console.log("response", response);

        if (!response.success) return;

        // Store access_token as auth_token for apiInstance
        if (response.data?.access_token) {
          setCookie("auth_token", response.data.access_token);
        }

        // Navigate to application page after successful signin
        navigate("/app");
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
