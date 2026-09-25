import { apiRequest } from "./api";

const MEMBERS_ENDPOINT =
  import.meta.env.VITE_MEMBERS_ENDPOINT || "/api/member";

const CREATEMEMBERS_ENDPOINT =
  import.meta.env.VITE_CREATEMEMBERS_ENDPOINT || "/api/createMember";

const REACTIVATEMEMBERS_ENDPOINT =
  import.meta.env.VITE_REACTIVATEMEMBERS_ENDPOINT || "/api/reactivatemember";

const DEACTIVATEMEMBERS_ENDPOINT =
  import.meta.env.VITE_DEACTIVATEMEMBERS_ENDPOINT || "/api/deactivatemember";

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

  if (typeof memberEmail === "string" && memberEmail.trim()) {
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

export async function updateMemberStatus(email, active) {
  return apiRequest( active ? `${DEACTIVATEMEMBERS_ENDPOINT}/${email}` : `${REACTIVATEMEMBERS_ENDPOINT}/${email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorisation: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      active,
    })
  });
}
