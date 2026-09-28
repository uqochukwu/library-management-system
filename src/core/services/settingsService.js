import { apiRequest } from "./api";

export const settingsService = {

  create: (p) =>
    apiRequest("/api/settings", { 
      method: "POST", 
      body: p 
    }),

  update: (p) =>
    apiRequest("/api/settings", { 
      method: "PUT", 
      body: p,
    
    }),
};
