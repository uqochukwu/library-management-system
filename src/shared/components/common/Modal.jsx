export default function Modal({
  title,
  icon = "✣",
  children,
  onClose,
  wide = false,
}) {
  return (
    <div className="mb-overlay">
      <section
        className={`mb-modal ${wide ? "mb-modal-wide" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <header className="mb-modal-header">
          <span className="mb-modal-icon">{icon}</span>
          <h2>{title}</h2>
          <button className="mb-close" onClick={onClose} type="button">
            ×
          </button>
        </header>
        <div className="mb-rule" />
        {children}
      </section>
    </div>
  );
}
