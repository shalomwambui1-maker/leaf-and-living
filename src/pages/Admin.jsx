import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import "../styles/admin.css";

// Admin page (/admin)
// Props come from App (from the useProducts hook):
// products, loading, loadError, refreshProducts, deleteProduct
function Admin({ products, loading, loadError, refreshProducts, deleteProduct }) {
  const location = useLocation();

  // success message sent from the Add/Edit pages
  const [message, setMessage] = useState(location.state?.message || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Delete button: open the confirmation
  function handleDeleteClick(product) {
    setMessage("");
    setErrorMessage("");
    setProductToDelete(product);
  }

  // "Yes, delete" button
  async function handleConfirmDelete() {
    const product = productToDelete;
    setDeleting(true);
    try {
      await deleteProduct(product.id);
      setMessage(`${product.name} was deleted`);
    } catch (error) {
      setErrorMessage("Could not delete the product. Please try again.");
    }
    setDeleting(false);
    setProductToDelete(null);
  }

  // while products are loading
  if (loading) {
    return (
      <div className="admin-page">
        <h1>Admin Portal</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  // if loading failed, show an error and a Retry button
  if (loadError) {
    return (
      <div className="admin-page">
        <h1>Admin Portal</h1>
        <p className="admin-error">Could not load products. Please try again.</p>
        <button className="admin-btn" onClick={refreshProducts}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Portal</h1>
        <Link to="/admin/products/new" className="admin-btn">
          + Add Product
        </Link>
      </div>

      {message && <p className="admin-success">{message}</p>}
      {errorMessage && <p className="admin-error">{errorMessage}</p>}

      {/* empty state */}
      {products.length === 0 ? (
        <p>No products yet. Click "Add Product" to create one.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Care level</th>
              <th>Price (KES)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="admin-thumb"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.careLevel}</td>
                <td>{product.price}</td>
                <td>
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="admin-btn small"
                  >
                    Edit
                  </Link>
                  <button
                    className="admin-btn small danger"
                    onClick={() => handleDeleteClick(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* confirmation popup */}
      {productToDelete && (
        <ConfirmDialog
          productName={productToDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setProductToDelete(null)}
          deleting={deleting}
        />
      )}
    </div>
  );
}

export default Admin;