import { apiRequest } from "./api";

const MEMBERS_ENDPOINT =
  import.meta.env.VITE_MEMBERS_ENDPOINT || "/api/member";

const CREATEMEMBERS_ENDPOINT =
  import.meta.env.VITE_CREATEMEMBERS_ENDPOINT || "/api/createMember";

export async function getMembers({
  active,
  memberEmail = "",
  pageNumber = 1,
  pageSize = 10,
  id = "",
  signal,
} = {}) {
  const params = new URLSearchParams();

  if (typeof active === "boolean") {
    params.set("active", String(active));
  }

  if (memberEmail.trim()) {
    params.set("memberEmail", memberEmail.trim());
  }

  params.set("pageNumber", String(pageNumber));
  params.set("pageSize", String(pageSize));
  params.set("id", String(id));

  return apiRequest(`${MEMBERS_ENDPOINT}?${params.toString()}`, { signal });
}

export async function getMemberById(id) {
  return apiRequest(`${MEMBERS_ENDPOINT}/${id}`);
}

export async function createMember(payload) {
  return apiRequest(CREATEMEMBERS_ENDPOINT, {
    method: "POST",
    body: payload,
  });
}

export async function updateMember(id, payload) {
  return apiRequest(`${MEMBERS_ENDPOINT}/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteMember(id) {
  return apiRequest(`${MEMBERS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
}
