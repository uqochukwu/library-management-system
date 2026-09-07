import React from "react";
import MemberModal from "./MemberModal";
import { getMemberEmail, getMemberId, getMemberName, getMemberContactNumber, getMemberPhoneNumber, } from "../../../utilities/memberHelpers";

export default function ViewMemberModal({ member, onClose }) {
  return (
    <MemberModal
      title="View User"
      icon="👁"
      onClose={onClose}
      className="member-view-modal"
      footer={
        <button
          type="button"
          className="member-button member-button-primary member-close-button"
          onClick={onClose}
        >
          CLOSE
        </button>
      }
    >
      <div className="member-view-card">
        <div className="member-view-left">
          <div>
            <span>User ID :</span>
            <strong>{getMemberId(member) || "—"}</strong>
          </div>
          <div>
            <span>Name :</span>
            <strong>{getMemberName(member)}</strong>
          </div>
          <div>
            <span>Email :</span>
            <strong>{getMemberEmail(member)}</strong>
          </div>
          <div>
            <span>Username :</span>
            <strong>{getMemberContactNumber(member)}</strong>
          </div>
          <div>
            <span>Username :</span>
            <strong>{getMemberPhoneNumber(member)}</strong>
          </div>
        </div>

        <div className="member-view-right">
          <p><b>Status :</b>{active ? "Active" : "Inactive"}</p>
          <p><b>Saved by :</b>Library Admin</p>
        </div>
      </div>
    </MemberModal>
  );
}
