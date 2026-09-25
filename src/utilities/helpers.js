export function getMemberId(member) {
  return member?.id ?? member?.memberId ?? member?.data?.id ?? "";
}

export function getMemberName(member) {
  return (
    member?.name
  );
}

export function getMemberEmail(member) {
  return member?.email ?? "—";
}

export function getMemberContactNumber(member) {
  return member?.contactNumber ?? "—";
}

export function getMemberPhoneNumber(member) {
  return member?.phoneNumber ?? "—";
}

export function getMemberActive(member) {
  if (typeof member?.active === "boolean") return member.active;
  if (typeof member?.isActive === "boolean") return member.isActive;
  return true;
}

export function getItems(response) {
  if (Array.isArray(response)) return response;

  return (
    response?.items ??
    response?.data?.items ??
    response?.data ??
    response?.members ??
    response?.users ??
    []
  );
}

export function getTotalCount(response, itemsLength = 0) {
  return Number(
    response?.totalCount ??
      response?.data?.totalCount ??
      response?.totalItems ??
      response?.data?.totalItems ??
      itemsLength
  );
}

export function getTotalPages(response, pageSize, totalCount) {
  const direct =
    response?.totalPages ??
    response?.data?.totalPages ??
    response?.pages ??
    response?.data?.pages;

  if (direct) return Number(direct);
  return Math.max(1, Math.ceil(totalCount / pageSize));
}

export function toMemberPayload(form, includePassword = true) {
  const payload = {
    name: form.name.trim(),
    email: form.email.trim(),
    contactNumber: form.contactNumber.trim(),
    phoneNumber: form.phoneNumber.trim(),
  };

  if (includePassword && form.password.trim()) {
    payload.password = form.password;
  }

  return payload;
}


export const listOf = (x) =>
  Array.isArray(x) ? x : x?.data || x?.items || x?.results || x?.members || x?.loans || x?.reservations || [];

export const totalOf = (x, list) =>
  x?.totalCount ?? x?.totalItems ?? x?.total ?? x?.count ?? list.length;

export const memberId = (m) => m?.id ?? m?.memberId ?? m?.userId ?? "";
export const memberName = (m) => m?.name ?? m?.fullName ?? m?.memberName ?? "—";
export const memberEmail = (m) => m?.email ?? m?.memberEmail ?? "—";
export const username = (m) => m?.username ?? m?.userName ?? "—";

export const loanId = (l) => l?.id ?? l?.loanId ?? "";
export const loanMemberId = (l) => l?.memberId ?? l?.userId ?? "—";
export const loanAmount = (l) => l?.amount ?? l?.totalBooks ?? l?.bookCount ?? "—";
export const loanDueDate = (l) => l?.dueDate ?? "—";
export const loanDate = (l) => l?.dateTime ?? l?.createdAt ?? l?.borrowedAt ?? "—";

export const bookId = (b) => b?.id ?? b?.bookId ?? "";
export const bookName = (b) => b?.name ?? b?.title ?? b?.bookName ?? "—";
export const bookType = (b) => b?.type ?? b?.category ?? "—";
export const bookLanguage = (b) => b?.language ?? "—";
