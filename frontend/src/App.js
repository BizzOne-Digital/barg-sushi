import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProtectedRoute, AdminRoute } from "./components/common/ProtectedRoute";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

// Customer pages
import HomePage from "./pages/customer/HomePage";
import MenuPage from "./pages/customer/MenuPage";
import GalleryPage from "./pages/customer/GalleryPage";
import CartPage from "./pages/customer/CartPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderConfirmation from "./pages/customer/OrderConfirmation";
import ReservationPage from "./pages/customer/ReservationPage";
import ContactPage from "./pages/customer/ContactPage";
import AboutPage from "./pages/customer/AboutPage";
import LoginPage from "./pages/customer/LoginPage";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminProductImages from "./pages/admin/AdminProductImages";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminSettings from "./pages/admin/AdminSettings";

import "./index.css";

const CustomerLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="page-enter">{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <ScrollToTop />
          <Routes>
            {/* Customer routes */}
            <Route path="/" element={<CustomerLayout><HomePage /></CustomerLayout>} />
            <Route path="/menu" element={<CustomerLayout><MenuPage /></CustomerLayout>} />
            <Route path="/gallery" element={<CustomerLayout><GalleryPage /></CustomerLayout>} />
            <Route path="/cart" element={<CustomerLayout><CartPage /></CustomerLayout>} />
            <Route path="/checkout" element={<CustomerLayout><CheckoutPage /></CustomerLayout>} />
            <Route path="/order-confirmation/:orderNumber" element={<CustomerLayout><OrderConfirmation /></CustomerLayout>} />
            <Route path="/reservations" element={<CustomerLayout><ReservationPage /></CustomerLayout>} />
            <Route path="/contact" element={<CustomerLayout><ContactPage /></CustomerLayout>} />
            <Route path="/about" element={<CustomerLayout><AboutPage /></CustomerLayout>} />
            <Route path="/login" element={<LoginPage />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/menu" element={<AdminRoute><AdminMenu /></AdminRoute>} />
            <Route path="/admin/product-images" element={<AdminRoute><AdminProductImages /></AdminRoute>} />
            <Route path="/admin/gallery" element={<AdminRoute><AdminGallery /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/reservations" element={<AdminRoute><AdminReservations /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
