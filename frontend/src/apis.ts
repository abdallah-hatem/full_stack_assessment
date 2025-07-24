import apiService from "./services/api/apiService";
import type { LoginData } from "./types/authTypes";

//  Login
export const LOGIN = async ({ data }: { data: LoginData }) => {
  return apiService.post({ resource: `login`, data });
};
