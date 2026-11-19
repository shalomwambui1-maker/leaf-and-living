// Small popup that asks "Are you sure?" before deleting
function ConfirmDialog({ productName, onConfirm, onCancel, deleting }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog" role="dialog" aria-modal="true">
        <p>
          Delete <strong>{productName}</strong>? This cannot be undone.
        </p>
        <div className="form-buttons">
          <button
            className="admin-btn danger"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Yes, delete"}
          </button>
          <button className="admin-btn outline" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;