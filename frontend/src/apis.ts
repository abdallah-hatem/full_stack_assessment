import apiService from "./services/api/apiService";
import type { LoginData, RegisterData } from "./types/authTypes";

//  Login
export const LOGIN = async ({ data }: { data: LoginData }) => {
  return apiService.post({
    resource: `auth/login`,
    data,
    skipUnauthorized: true,
    skipSuccessMessage: false,
  });
};

// Register
export const REGISTER = async ({ data }: { data: RegisterData }) => {
  return apiService.post({
    resource: `auth/register`,
    data,
    skipUnauthorized: true,
    skipSuccessMessage: false,
  });
};

// Get user
export const GET_USER = async ({
  skipErrorMessage = false,
}: {
  skipErrorMessage?: boolean;
}) => {
  return apiService.get({ resource: `auth/me`, skipErrorMessage });
};
