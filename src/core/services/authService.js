import { apiFetch } from "./api";

export const authService = {
  login: (payload) =>
    apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  register: (payload) =>
    apiFetch("/api/auth/users", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
