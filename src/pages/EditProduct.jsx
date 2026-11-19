import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import "../styles/admin.css";

// Edit product page (/admin/products/:id/edit)
// products and updateProduct come from App (from the useProducts hook)
function EditProduct({ products, loading, updateProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="admin-page">
        <p>Loading product...</p>
      </div>
    );
  }

  // find the product that matches the id in the URL
  const product = products.find((p) => String(p.id) === id);

  // product not found
  if (!product) {
    return (
      <div className="admin-page">
        <h1>Product not found</h1>
        <p>We could not find that product.</p>
        <Link to="/admin" className="admin-btn">
          Back to Admin
        </Link>
      </div>
    );
  }

  async function handleUpdate(changes) {
    await updateProduct(product.id, changes);
    navigate("/admin", { state: { message: "Product updated successfully" } });
  }

  return (
    <div className="admin-page">
      <ProductForm
        title="Edit product"
        initialValues={product}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/admin")}
        submitLabel="Save changes"
      />
    </div>
  );
}

export default EditProduct;