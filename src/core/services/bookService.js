import { apiRequest } from "./api";
const q = (p = {}) => {
  const s = new URLSearchParams();
  if (p.search) s.set("searchterm", p.search);
  if (p.pageNumber) s.set("pageNumber", p.pageNumber);
  if (p.pageSize) s.set("pageSize", p.pageSize);
  if (p.type) s.set("type", p.type);
  return s.toString() ? `?${s}` : "";
};
export const bookService = {
  list: (p = {}) => 
    apiRequest(`/api/book/books${q(p)}`),
  create: (payload) =>
    apiRequest("/api/book/create", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (payload) =>
    apiRequest("/api/book/update", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  remove: (payload) =>
    apiRequest("/api/book/remove", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};
