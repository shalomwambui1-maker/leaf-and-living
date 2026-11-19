import { Link } from "react-router-dom";

// Admin page (/admin)
// Props come from App (from the useProducts hook):
// products, loading, loadError, refreshProducts
function Admin({ products, loading, loadError, refreshProducts }) {
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

      <p>Total products: {products.length}</p>
    </div>
  );
}

export default Admin;