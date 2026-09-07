import React, { useEffect, useState } from "react";
import MemberModal from "./MemberModal";
import { getMemberEmail, getMemberName, getMemberContactNumber, getMemberPhoneNumber, } from "../../../utilities/helpers";

const EMPTY_FORM = {
  name: "",
  email: "",
  contactNumber: "",
  phoneNumber: "",
  password: "",
};

export default function MemberFormModal({
  mode = "add",
  member = null,
  loading = false,
  error = "",
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (mode === "update" && member) {
      setForm({
        name: getMemberName(member) === "—" ? "" : getMemberName(member),
        email: getMemberEmail(member) === "—" ? "" : getMemberEmail(member),
        contactNumber: getMemberContactNumber(member) === "—" ? "" : getMemberContactNumber(member),
        phoneNumber: getMemberPhoneNumber(member) === "—" ? "" : getMemberPhoneNumber(member),
        password: "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [mode, member]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  const isUpdate = mode === "update";

  return (
    <MemberModal
      title={isUpdate ? "Update User" : "Add User"}
      icon="♟"
      onClose={onClose}
      className="member-form-modal"
      footer={
        <div className="member-modal-actions">
          <button
            type="button"
            className="member-button member-button-secondary"
            onClick={onClose}
            disabled={loading}
          >
            CANCEL
          </button>
          <button
            type="submit"
            form="member-form"
            className="member-button member-button-primary"
            disabled={loading}
          >
            {loading ? "SAVING..." : isUpdate ? "UPDATE" : "ADD"}
          </button>
        </div>
      }
    >
      <form id="member-form" className="member-form" onSubmit={handleSubmit}>
        {error ? <div className="member-form-error">{error}</div> : null}

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          autoComplete="name"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          autoComplete="email"
          required
        />

        <div className="member-form-row">
          <input
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            autoComplete="contact Number"
            required
          />

          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            autoComplete="Phone Number"
            required
          />

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={isUpdate ? "Password (optional)" : "Password"}
            type="password"
            autoComplete={isUpdate ? "new-password" : "new-password"}
            required={!isUpdate}
          />
        </div>
      </form>
    </MemberModal>
  );
}
