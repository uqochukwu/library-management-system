import { apiFetch } from "./api";
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
    apiFetch(`/api/book/books${q(p)}`),
  create: (payload) =>
    apiFetch("/api/book/create", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (payload) =>
    apiFetch("/api/book/update", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  remove: (payload) =>
    apiFetch("/api/book/remove", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};
