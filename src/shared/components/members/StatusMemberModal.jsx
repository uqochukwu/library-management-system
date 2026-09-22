import React from "react";
import MemberModal from "./MemberModal";

export default function StatusMemberModal({
  member,
  loading,
  error,
  onClose,
  onConfirm,
}) {
  const isActive = member?.active;

  const action = isActive ? "Suspend" : "Reactivate";

  return (
    <MemberModal
      icon="🚫"
      onClose={onClose}
      className="delete-member-modal"
    >
      <h2>{action} Member</h2>

      <p className="delete-message">
        "Are you certain you want to {action.toLowerCase()} this User?"
      </p>

      {error ? <p>{error}</p> : null}

      <div className="delete-confirm-wrap">
        {/* <button type="button" onClick={onClose}>
          cancel
        </button> */}

        <button
          type="button"
          className="member-button member-button-primary delete-confirm-button"
          onClick={() => onConfirm(member)}
          disabled={loading}
        >
          {loading ? "Processing..." : action}
        </button>
      </div>
    </MemberModal>
  );
}
