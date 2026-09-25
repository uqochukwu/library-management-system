import { apiFetch } from "./api";

export const loanService = {
  list(p = {}) {
    const q = new URLSearchParams({
      returned: String(p.returned ?? false),
      memberEmail: p.memberEmail || p.memberId || "",
      pageNumber: String(p.pageNumber ?? 1),
      pageSize: String(p.pageSize ?? 10),
    });
    return apiFetch(`/api/loan?${q}`);
  },

   getBorrowedBooks: async () => {
    const response = await apiFetch.get(
      "/api/loan"
    );

    return response.data;
  },

  getOverdueBooks: async () => {
    const response = await apiFetch.get(
      "/api/loan"
    );

    return response.data;
  },

  borrow: (p) =>
    apiFetch("/api/issueBook", { method: "POST", body: JSON.stringify(p) }),
  returnBook: (p) =>
    apiFetch("/api/processReturn", {
      method: "POST",
      body: JSON.stringify(p),
    }),
};
