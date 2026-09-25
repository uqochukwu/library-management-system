import { apiFetch } from "./api";
import { endpoints } from "./endpoints";

export const reservationService = {
  list(params = {}) {
    const q = new URLSearchParams({
      memberEmail: params.memberEmail || "",
      pageNumber: String(params.pageNumber ?? 1),
      pageSize: String(params.pageSize ?? 10),
    });
    return apiFetch(`${endpoints.reservations}?${q}`);
  },

  create(payload) {
    return apiFetch(endpoints.reservation, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
