import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Admin from './pages/Admin'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import NotFound from './pages/NotFound'
import useProducts from './hooks/useProducts'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default function App() {
  // Initialize the product data hook once for the app.
  useProducts()

  return (
  <div className="app">
    <Navbar />
    <main className="content">
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products/new" element={<AddProduct />} />
        <Route path="/admin/products/:id/edit" element={<EditProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </div>
)

export default function App() {
  // useProducts is called once here: the single source of truth for product data.
  const { products, loading, loadError, refreshProducts,
          addProduct, updateProduct, deleteProduct } = useProducts()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={
        <Shop products={products} loading={loading}
              loadError={loadError} onRetry={refreshProducts} />} />
      <Route path="/products/:id" element={
        <ProductDetails products={products} loading={loading} />} />
      <Route path="/admin" element={
        <Admin products={products} loading={loading}
               loadError={loadError} deleteProduct={deleteProduct} />} />
      <Route path="/admin/products/new" element={
        <AddProduct addProduct={addProduct} />} />
      <Route path="/admin/products/:id/edit" element={
        <EditProduct products={products} updateProduct={updateProduct} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}