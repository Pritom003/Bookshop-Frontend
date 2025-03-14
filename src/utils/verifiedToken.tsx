import { jwtDecode } from "jwt-decode";

export const verifiedToken = (token: string) => {
  return jwtDecode(token);
};