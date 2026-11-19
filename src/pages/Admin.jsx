import { Link } from "react-router-dom";

// Admin page (/admin)
// Props come from App (from the useProducts hook):
// products, loading, loadError, refreshProducts
function Admin({ products, loading, loadError, refreshProducts }) {
  // Delete button - the confirmation will be added later
  function handleDeleteClick(product) {
    console.log("Delete clicked for", product.name);
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
    </div>
  );
}

export default Admin;