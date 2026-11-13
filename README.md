# ☕ Brew & Bloom Café – Premium Artisan Coffee & Online Ordering Platform

A production-ready, full-stack café web application and administrative management suite engineered with React, Tailwind CSS, Framer Motion, Express.js, MongoDB Atlas, and prepared for Microsoft Azure Linux Virtual Machine deployment with automated GitHub Actions CI/CD.

---

## 🌟 Live Demo & Architecture Highlights

- **Visual Design**: Warm coffee brown, beige, cream, and deep espresso palette, typography via *Playfair Display* & *Inter*, glassmorphism cards, fluid transitions, and responsive mobile-first layouts.
- **Frontend Stack**: React 18, Vite 5, Tailwind CSS, Framer Motion, Lucide React, Zustand State Management, React Hook Form, React Query, Recharts.
- **Backend Stack**: Node.js, Express.js REST API, Mongoose (MongoDB Atlas), JWT Authentication, bcryptjs password hashing, Helmet, CORS, Morgan, Express Rate Limit.
- **Cloud & DevOps**: Microsoft Azure Linux VM (Ubuntu 22.04 LTS), Nginx Reverse Proxy & HTTP/2 Gzip, PM2 Cluster Manager, Certbot SSL, GitHub Actions CI/CD.
- **Resilient Fallback**: Operates both connected to live MongoDB Atlas and in-memory with seed datasets so development and testing run out-of-the-box.

---

## 📁 Project Structure

```
cafe/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated CI/CD pipeline for Azure VM
├── frontend/                     # React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── home/             # Hero, Featured, About, Offers, Testimonials, Gallery, Newsletter
│   │   │   └── shared/           # Navbar, Footer, ProductCard, SectionHeader, PageLoader, ProtectedRoute
│   │   ├── hooks/                # useProducts, useOrders, useTheme
│   │   ├── lib/                  # Axios HTTP client with auth interceptors
│   │   ├── pages/                # Home, Menu, Cart, Checkout, OrderConfirmation, Reservation, About, Contact, Login, Register, Profile, OrderHistory
│   │   │   └── admin/            # AdminLayout, AdminDashboard, AdminProducts, AdminOrders, AdminReservations, AdminCustomers, AdminCoupons
│   │   ├── store/                # Zustand stores (authStore, cartStore, wishlistStore)
│   │   ├── App.jsx               # Router & lazy-loaded view paths
│   │   ├── index.css             # Tailwind base, utilities & color palette
│   │   └── main.jsx              # React DOM entry
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/                      # Node.js + Express REST API
│   ├── src/
│   │   ├── config/               # Database connection (MongoDB Atlas)
│   │   ├── controllers/          # Business logic (Auth, Products, Orders, Reservations, Coupons, Admin)
│   │   ├── middleware/           # JWT protect & adminOnly access guards, error handler
│   │   ├── models/               # Mongoose Schemas (User, Product, Order, Reservation, Coupon, Newsletter)
│   │   ├── routes/               # Modular Express API endpoints
│   │   ├── utils/                # DB seeding script & rich catalogue
│   │   └── index.js              # Server entry point & static frontend fallback
│   ├── .env.example
│   └── package.json
├── ecosystem.config.cjs          # PM2 cluster process management for Azure
├── nginx.conf                    # Nginx reverse proxy & static cache configuration
├── .gitignore
└── README.md
```

---

## 🚀 Local Development Quickstart

### 1. Prerequisites
- **Node.js**: v18.x or v20+
- **npm**: v9+

### 2. Run the Backend API

```bash
cd backend
npm install
npm run dev
# The API starts on http://localhost:5001
```

*Optional MongoDB Atlas Configuration:*
Set `MONGODB_URI` in `backend/.env`. If omitted, the server operates in resilient in-memory mode with pre-seeded artisan coffee products!

To seed default products to MongoDB Atlas:
```bash
npm run seed
```

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
# Vite server starts on http://localhost:5173
```

To build the frontend for production:
```bash
npm run build
```

---

## 🧪 Demo User Accounts

Quick 1-click test credentials are built into the Login screen:

| Account Type | Email Address | Password | Permissions |
|---|---|---|---|
| **Café Administrator** | `admin@brew.com` | `admin123` | Full access to `/admin` dashboard, inventory, orders, revenue charts |
| **Regular Patron** | `demo@brew.com` | `demo123` | Cart checkout, reservation bookings, order history, wishlist |

---

## 🌐 Main Website Pages & Functional Capabilities

1. **Home Page (`/`)**:
   - Immersive hero section with coffee photography, staggered framer-motion reveals, and CTAs.
   - Best-selling products grid with ratings and "Add to Basket".
   - Our Story section with floating experience badge (10+ Years).
   - Curated seasonal promotion cards with redeemable voucher codes.
   - Verified guest testimonials grid with 5-star badges.
   - Instagram photography gallery with hover engagement overlays.
   - Newsletter subscription integrated with backend API.

2. **Menu Page (`/menu`)**:
   - Interactive category tabs (Hot Coffee, Cold Coffee, Tea, Frappes, Desserts, Bakery, Snacks).
   - Real-time search by keyword and ingredient.
   - Price sorting (Low to High, High to Low), Top Rated, and Alphabetical order.
   - Item stock badges, price, and instant cart synchronization.

3. **Online Ordering & Cart (`/cart` & `/checkout`)**:
   - Cart with quantity steppers, live subtotal, GST (5%) calculation, and free delivery perks.
   - Promo coupon code verification (try: `BLOOM20`, `PAIR399`, `EARLYBIRD`).
   - Checkout delivery address validation with recipient instructions.
   - Simulated payment gateway (Cards, UPI, Cash on Delivery).
   - Order Confirmation (`/order-confirmation/:id`) with live order tracking timeline.
   - Past order history (`/orders`) with expandable invoice breakdown and 1-click reorder.

4. **Table Reservation (`/reservation`)**:
   - Date picker, available time slots (08:00 AM – 09:00 PM), guest party count (1-12).
   - Instant booking confirmation ticket.

5. **User Profile & Wishlist (`/profile`)**:
   - Account details editor, member status badge.
   - Saved items wishlist with direct add-to-cart.

6. **Admin Dashboard (`/admin`)**:
   - Protected route requiring `role: 'admin'`.
   - KPI metrics: Weekly Revenue (₹), Total Orders, Active Patrons, Pending Queue.
   - Interactive Recharts Area & Bar charts for weekly sales trends and category breakdown.
   - Menu & Inventory manager (`/admin/products`): Add, edit, toggle in-stock/sold-out, and delete menu items.
   - Orders manager (`/admin/orders`): Update order fulfillment status (Pending → Confirmed → Preparing → Out for Delivery → Delivered).
   - Table reservations manager (`/admin/reservations`): Manage reservations and table seating.
   - Patrons directory (`/admin/customers`): Lifetime loyalty and spent statistics.
   - Coupons manager (`/admin/coupons`): Create and toggle promotional discount codes.

---

## ☁️ Microsoft Azure Virtual Machine Deployment Guide

### 1. Provision Azure Linux VM
- **OS**: Ubuntu 22.04 LTS (x64)
- **Size**: Standard B1ms or B2s (1-2 vCPU, 2-4 GiB RAM)
- **Inbound Port Rules (Azure Network Security Group)**:
  - `SSH` (Port 22)
  - `HTTP` (Port 80)
  - `HTTPS` (Port 443)

### 2. Connect to the Azure VM
```bash
ssh -i ~/.ssh/azure_vm_key azureuser@YOUR_AZURE_PUBLIC_IP
```

### 3. Server Preparation & Tool Installation
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git certbot python3-certbot-nginx ufw

# Install PM2 globally
sudo npm install -g pm2
```

### 4. Firewall Configuration (UFW)
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

### 5. Clone and Deploy Application
```bash
sudo mkdir -p /var/www/brew-and-bloom
sudo chown -R $USER:$USER /var/www/brew-and-bloom
git clone <YOUR_GITHUB_REPO_URL> /var/www/brew-and-bloom
cd /var/www/brew-and-bloom

# Frontend Build
cd frontend
npm install
npm run build
cd ..

# Backend Setup
cd backend
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string & JWT key
npm install --production=true
cd ..

# Start PM2 Process Manager
pm2 start ecosystem.config.cjs --env production
pm2 startup
pm2 save
```

### 6. Configure Nginx Reverse Proxy
```bash
sudo cp nginx.conf /etc/nginx/sites-available/brew-and-bloom
sudo ln -s /etc/nginx/sites-available/brew-and-bloom /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Enable SSL via Let's Encrypt (Certbot)
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 🔄 GitHub Actions CI/CD Pipeline Setup

The repository includes an automated pipeline in `.github/workflows/deploy.yml`.

Whenever code is pushed to the `main` branch, the pipeline will:
1. Run automated build and syntax validations on both frontend and backend.
2. Establish a secure SSH session to your Azure Virtual Machine.
3. Pull the latest release code.
4. Execute `npm run build` on the React frontend.
5. Perform a zero-downtime cluster reload with `pm2 reload`.
6. Reload Nginx and verify health check response on `http://localhost:5001/api/health`.

### Required GitHub Secrets
In your GitHub repository, navigate to **Settings > Secrets and variables > Actions** and add:

| Secret Name | Description |
|---|---|
| `AZURE_VM_HOST` | Public IP Address or DNS name of your Azure VM |
| `AZURE_VM_USERNAME` | Azure VM admin username (e.g. `azureuser`) |
| `AZURE_VM_SSH_KEY` | Private SSH Key content (`~/.ssh/id_rsa` or generated pem) |
| `AZURE_VM_PORT` | SSH Port (default: `22`) |

---

## ☕ License & Craft
Crafted with passion for **Brew & Bloom Café**. Built to deliver an unforgettable specialty coffee experience.
