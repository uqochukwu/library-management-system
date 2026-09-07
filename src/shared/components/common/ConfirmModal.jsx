import Modal from "./Modal";

export default function ConfirmModal({
  title,
  message,
  confirmText = "CONFIRM",
  loading = false,
  onConfirm,
  onClose,
}) {
  return (
    <Modal title={title} icon="▣" onClose={onClose}>
      <p className="mb-confirm-copy">{message}</p>
      <div className="mb-buttons mb-buttons-centered">
        <button className="mb-secondary" onClick={onClose} type="button">
          CANCEL
        </button>
        <button
          className="mb-primary"
          disabled={loading}
          onClick={onConfirm}
          type="button"
        >
          {loading ? "PLEASE WAIT..." : confirmText}
        </button>
      </div>
    </Modal>
  );
}
