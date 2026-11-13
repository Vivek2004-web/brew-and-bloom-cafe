import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import ScrollToTop from './components/shared/ScrollToTop'
import ProtectedRoute from './components/shared/ProtectedRoute'
import AdminRoute from './components/shared/AdminRoute'
import { useAuthStore } from './store/authStore'

// Pages - lazy loaded
import { lazy, Suspense } from 'react'
import PageLoader from './components/shared/PageLoader'

const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'))
const ReservationPage = lazy(() => import('./pages/ReservationPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))
const AdminReservations = lazy(() => import('./pages/admin/AdminReservations'))
const AdminCustomers = lazy(() => import('./pages/admin/AdminCustomers'))
const AdminCoupons = lazy(() => import('./pages/admin/AdminCoupons'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  const { initAuth } = useAuthStore()

  useEffect(() => { initAuth() }, [initAuth])

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Admin routes — no Navbar/Footer */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="reservations" element={<AdminReservations />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="coupons" element={<AdminCoupons />} />
          </Route>

          {/* Public routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/reservation" element={<ReservationPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                  <Route path="/order-confirmation/:orderId" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
