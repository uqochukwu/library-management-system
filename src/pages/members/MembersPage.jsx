import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createMember, getMembers, updateMemberStatus, } from "../../core/services/memberService";
import MemberFormModal from "../../shared/components/members/MemberFormModal";
import ViewMemberModal from "../../shared/components/members/StatusMemberModal";
import StatusMemberModal from "../../shared/components/members/StatusMemberModal";
import MemberTable from "../../shared/components/members/MemberTable";
import Pagination from "../../shared/components/common/Pagination";
import {
  getItems,
  getTotalCount,
  getTotalPages,
  toMemberPayload,
} from "../../utilities/helpers";
import "./members.css";

const PAGE_SIZE = 10;

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(undefined);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [responseMeta, setResponseMeta] = useState(null);

  const [modal, setModal] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalError, setModalError] = useState("");

  const handleStatusChange = (member) => {
    setSelectedMember(member);
    setShowStatusModal(true)
  }

  const loadMembers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMembers({
        active,
        memberEmail: search,
        pageNumber,
        pageSize: PAGE_SIZE,
      });

      const items = getItems(response);

      setMembers(items);
      setResponseMeta(response);
    } catch (requestError) {
      if (requestError.name !== "AbortError") {
        setError(requestError.message || "Unable to load users.");
        setMembers([]);
      }
    } finally {
      setLoading(false);
    }
  }, [active, search, pageNumber]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const totalCount = useMemo(
    () => getTotalCount(responseMeta, members.length),
    [responseMeta, members.length],
  );

  const totalPages = useMemo(
    () => getTotalPages(responseMeta, PAGE_SIZE, totalCount),
    [responseMeta, totalCount],
  );

  function handleSearchSubmit(event) {
    event.preventDefault();
    setPageNumber(1);
    loadMembers();
  }

  function openAdd() {
    setModalError("");
    setSelectedMember(null);
    setModal("add");
  }

  function openEdit(member) {
    setModalError("");
    setSelectedMember(member);
    setModal("edit");
  }

  function openView(member) {
    setModalError("");
    setSelectedMember(member);
    setModal("view");
  }

  function openStatusChange(member) {
    setModalError("");
    setSelectedMember(member);
    setModal("status");
  }

  function closeModal() {
    if (saving) return;
    setModal(null);
    setSelectedMember(null);
    setModalError("");
  }

  async function handleSave(form) {
    setSaving(true);
    setModalError("");

    try {
      if (modal === "add") {
        await createMember(toMemberPayload(form, true));
      } else {
        const id = selectedMember?.email;

        if (!id) throw new Error("The selected user has no valid ID.");

        await updateMember(id, toMemberPayload(form, false));
      }

      closeModal();
      await loadMembers();
    } catch (requestError) {
      setModalError(requestError.message || "Unable to save user.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSuspendReactivate(member) {
    setModalError("");

    const memberId = member?.email;

    if (!memberId) {
      setModalError("The selected user has no valid ID");
      return;
    }

    setSaving(true);

    try {
      await updateMemberStatus(memberId, !member.active);

      closeModal();
      await loadMembers();
    } catch (requestError) {
      setModalError(requestError.message || "Failed to update member status");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="members-page">
      <div className="members-page-header">
        <h1>User Management</h1>

        <div className="members-page-actions">
          <button
            type="button"
            className="member-button member-button-primary add-user-button"
            onClick={openAdd}
          >
            <span aria-hidden="true">+</span>
            Add User
          </button>

          <form className="member-search" onSubmit={handleSearchSubmit}>
            <span aria-hidden="true">⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by ID or Name"
              aria-label="Search users"
            />
            <button type="submit" aria-label="Search">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="members-content-card">
        {error ? (
          <div className="members-error">
            <span>{error}</span>
            <button type="button" onClick={loadMembers}>
              Retry
            </button>
          </div>
        ) : null}

        <div className="members-toolbar">
          <label>
            Status
            <select
              value={typeof active === "boolean" ? String(active) : "all"}
              onChange={(event) => {
                const value = event.target.value;
                setPageNumber(1);
                setActive(value === "all" ? undefined : value === "true");
              }}
            >
              <option value="all">All Users</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </label>

          <span className="members-count">
            {totalCount} user{totalCount === 1 ? "" : "s"}
          </span>
        </div>

        {loading ? (
          <div className="members-loading">
            <span />
            Loading users...
          </div>
        ) : members.length === 0 ? (
          <div className="members-empty">
            <h2>No users found</h2>
            <p>There are no users matching your current search.</p>
          </div>
        ) : (
          <>
            <MemberTable
              members={members}
              onEdit={openEdit}
              onStatusChange={handleStatusChange}
              onView={openView}
            />

            <Pagination
              pageNumber={pageNumber}
              totalPages={totalPages}
              onPrevious={() =>
                setPageNumber((current) => Math.max(1, current - 1))
              }
              onNext={() =>
                setPageNumber((current) => Math.min(totalPages, current + 1))
              }
            />
          </>
        )}
      </div>

      {modal === "add" || modal === "edit" ? (
        <MemberFormModal
          mode={modal === "edit" ? "update" : "add"}
          member={selectedMember}
          loading={saving}
          error={modalError}
          onClose={closeModal}
          onSubmit={handleSave}
        />
      ) : null}

      {modal === "view" && selectedMember ? (
        <ViewMemberModal member={selectedMember} onClose={closeModal} />
      ) : null}

      {showStatusModal && (
        <StatusMemberModal
          member={selectedMember}
          loading={saving}
          error={modalError}
          onClose={closeModal}
          onConfirm={handleSuspendReactivate}
        />
      )}
    </main>
  );
}
