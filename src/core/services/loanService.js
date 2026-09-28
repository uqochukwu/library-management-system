import { apiFetch } from "./api";

export const loanService = {
  list(p = {}) {
    const params = new URLSearchParams();

    if (p.active !== undefined) {
      params.set("active", String(p.active));
    }

    if (p.isDue !== undefined) {
      params.set("isDue", String(p.isDue));
    }

    if (p.memberEmail) {
      params.set("memberEmail", p.memberEmail);
    }

    if (p.pageNumber !== undefined) {
      params.set("pageNumber", String(p.pageNumber));
    }

    if (p.pageSize !== undefined) {
      params.set("pageSize", String(p.pageSize));
    }

    if (p.loanId) {
      params.set("loanId", p.loanId);
    }

    if (p.memberId) {
      params.set("memberId", p.memberId);
    }

    return apiFetch(`/api/loan?${params.toString()}`);
  },

  getBorrowedBooks() {
    return this.list({
      active: true,
      pageNumber: 1,
      pageSize: 100,
    });
  },

  getOverdueBooks() {
    return this.list({
      isDue: true,
      pageNumber: 1,
      pageSize: 100,
    });
  },

  borrow: (p) =>
    apiFetch("/api/issueBook", {
      method: "POST",
      body: JSON.stringify(p),
    }),

  returnBook: (p) =>
    apiFetch("/api/processReturn", {
      method: "POST",
      body: JSON.stringify(p),
    }),
};