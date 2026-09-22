import React from "react";
import { getMemberEmail, getMemberId, getMemberName, getMemberContactNumber, getMemberPhoneNumber, getMemberActive } from "../../../utilities/helpers";

function Actions({ member, onEdit, onStatusChange, onView }) {
  return (
    <div className="member-row-actions">
      <button
        type="button"
        onClick={() => onEdit(member)}
        aria-label={`Edit ${getMemberName(member)}`}
        title="Edit"
      >
        ✎
      </button>

      <button
        type="button"
        onClick={() => onStatusChange(member)}
        aria-label={`StatusChange ${getMemberActive(member)}`}
        title="Suspend/Reactivate"
      >
        ⏼
      </button>

      <button
        type="button"
        onClick={() => onView(member)}
        aria-label={`View ${getMemberName(member)}`}
        title="View"
      >
        👁
      </button>
    </div>
  );
}

export default function MemberTable({
  members,
  onEdit,
  onDelete,
  onView,
}) {
  return (
    <>
      <div className="members-table-shell">
        <table className="members-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member, index) => (
              <tr key={getMemberId(member) || `${getMemberEmail(member)}-${index}`}>
                <td>{getMemberId(member) || "—"}</td>
                <td>{getMemberName(member)}</td>
                <td>{getMemberEmail(member)}</td>
                <td>{getMemberPhoneNumber(member)}</td>
                <td>{getMemberContactNumber(member)}</td>
                <td>
                  <Actions
                    member={member}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="members-mobile-list">
        {members.map((member, index) => (
          <article
            className="member-mobile-card"
            key={getMemberId(member) || `mobile-${index}`}
          >
            <div className="member-mobile-card-top">
              <strong>{getMemberName(member)}</strong>
              <span>ID: {getMemberId(member) || "—"}</span>
            </div>

            <p>{getMemberEmail(member)}</p>
            <p>{getMemberContactNumber(member)}</p>
            <p>{getMemberPhoneNumber(member)}</p>

            <Actions
              member={member}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          </article>
        ))}
      </div>
    </>
  );
}
