import { apiRequest } from "./api";

export const loanService = {
  list(p = {}) {
    const q = new URLSearchParams({
      returned: String(p.returned ?? false),
      memberEmail: p.memberEmail || p.memberId || "",
      pageNumber: String(p.pageNumber ?? 1),
      pageSize: String(p.pageSize ?? 10),
    });
    return apiRequest(`/api/loan?${q}`);
  },
  borrow: (p) =>
    apiRequest("/api/issueBook", { method: "POST", body: JSON.stringify(p) }),
  returnBook: (p) =>
    apiRequest("/api/processReturn", {
      method: "POST",
      body: JSON.stringify(p),
    }),
};
