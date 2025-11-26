import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/common/ToastContainer';
import { CartDrawer } from './components/cart/CartDrawer';

// Layouts
import { ShopLayout } from './components/layout/ShopLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedAdminRoute } from './components/admin/ProtectedAdminRoute';

// Shop Pages
import { HomePage } from './pages/shop/HomePage';
import { ProductsPage } from './pages/shop/ProductsPage';
import { ProductDetailsPage } from './pages/shop/ProductDetailsPage';
import { CartPage } from './pages/shop/CartPage';
import { CheckoutPage } from './pages/shop/CheckoutPage';
import { SalesPage } from './pages/shop/SalesPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AddProductPage } from './pages/admin/AddProductPage';
import { EditProductPage } from './pages/admin/EditProductPage';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Public Shop Routes */}
          <Route element={<ShopLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products/new" element={<AddProductPage />} />
            <Route path="products/edit/:id" element={<EditProductPage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Global Components */}
        <ToastContainer />
        <CartDrawer />
      </Router>
    </ToastProvider>
  );
}

export default App;
