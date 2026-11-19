import { Link } from "react-router-dom";

// Admin page (/admin)
// products comes from App (from the useProducts hook)
function Admin({ products }) {
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