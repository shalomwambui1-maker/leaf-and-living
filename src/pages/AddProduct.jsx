import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import "../styles/admin.css";

// empty values for a new product (no id, the backend makes it)
const emptyProduct = {
  name: "",
  category: "",
  careLevel: "",
  description: "",
  price: "",
  image: "",
};

// Add product page (/admin/products/new)
// addProduct comes from App (from the useProducts hook)
function AddProduct({ addProduct }) {
  const navigate = useNavigate();

  async function handleAdd(productData) {
    await addProduct(productData); // if this fails, the form shows the error
    navigate("/admin", { state: { message: "Product added successfully" } });
  }

  return (
    <div className="admin-page">
      <ProductForm
        title="Add product"
        initialValues={emptyProduct}
        onSubmit={handleAdd}
        onCancel={() => navigate("/admin")}
        submitLabel="Add product"
      />
    </div>
  );
}

export default AddProduct;