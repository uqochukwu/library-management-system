import React from "react";

export default function MemberModal({
  title,
  icon = "♟",
  children,
  onClose,
  footer,
  className = "",
}) {
  return (
    <div className="member-modal-overlay" onMouseDown={onClose}>
      <section
        className={`member-modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="member-modal-header">
          <div className="member-modal-title">
            <span className="member-modal-icon" aria-hidden="true">
              {icon}
            </span>
            <h2>{title}</h2>
          </div>

          <button
            type="button"
            className="member-modal-close"
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            ×
          </button>
        </header>

        <div className="member-modal-divider" />

        <div className="member-modal-body">{children}</div>

        {footer ? <footer className="member-modal-footer">{footer}</footer> : null}
      </section>
    </div>
  );
}
