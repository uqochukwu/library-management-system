import React from "react";
import MemberModal from "./MemberModal";

export default function DeleteMemberModal({
  loading = false,
  error = "",
  onClose,
  onConfirm,
}) {
  return (
    <MemberModal
      title="Delete Confirmation"
      icon="🚫"
      onClose={onClose}
      className="delete-member-modal"
    >
      {error ? <div className="member-form-error">{error}</div> : null}

      <p className="delete-message">
        "Are you certain you wish to proceed with the deletion of the selected
        entry?"
      </p>

      <div className="delete-confirm-wrap">
        <button
          type="button"
          className="member-button member-button-primary delete-confirm-button"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "DELETING..." : "CONFIRM"}
        </button>
      </div>
    </MemberModal>
  );
}
