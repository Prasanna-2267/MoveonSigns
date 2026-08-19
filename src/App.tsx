import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { SearchProvider } from './context/SearchContext';
import { PageLayout } from './components/layout/PageLayout';
import { AdminLayout } from './components/admin/AdminLayout';

// Storefront Pages
import { Home } from './pages/Home';
import { CollectionPage } from './pages/Collection';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { SearchPage } from './pages/SearchPage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { ShippingPage } from './pages/ShippingPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { BlogPage } from './pages/BlogPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

// Admin Pages (7-Item Navigation Grouping)
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductEditor } from './pages/admin/AdminProductEditor';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminShipping } from './pages/admin/AdminShipping';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminDiscounts } from './pages/admin/AdminDiscounts';
import { AdminAbandonedCarts } from './pages/admin/AdminAbandonedCarts';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminSearchAnalytics } from './pages/admin/AdminSearchAnalytics';

export function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <AdminLayout>
        <Routes>
          {/* 1. Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* 2. Store */}
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/edit/:productId" element={<AdminProductEditor />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/shipping" element={<AdminShipping />} />

          {/* 3. Orders */}
          <Route path="/admin/orders" element={<AdminOrders />} />

          {/* 4. Customers */}
          <Route path="/admin/customers" element={<AdminCustomers />} />

          {/* 5. Marketing */}
          <Route path="/admin/discounts" element={<AdminDiscounts />} />
          <Route path="/admin/abandoned-carts" element={<AdminAbandonedCarts />} />

          {/* 6. Analytics */}
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/analytics/search" element={<AdminSearchAnalytics />} />

          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
    );
  }

  return (
    <CurrencyProvider>
      <CartProvider>
        <SearchProvider>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Navigate to="/collections/all-products" replace />} />
              <Route path="/collections/:collectionSlug" element={<CollectionPage />} />
              <Route path="/products/:productSlug" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageLayout>
        </SearchProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
