# SK Cold Chain Solutions Sdn Bhd - 3PL Portal Prototype

A modern, high-performance web portal for Third-Party Logistics management, built with Next.js 15, Tailwind CSS, and shadcn/ui.

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (Radix UI primitives)
- **Table Engine:** TanStack Table (React Table v8)
- **Forms:** React Hook Form + Zod Validation
- **Animations:** Framer Motion

## 📊 Project Status & Roadmap

### 🏗️ Core Architecture
- [x] Dashboard Layout (Responsive + Collapsible Sidebar)
- [x] Global Navigation (Client/Admin/Future Modules)
- [x] Reusable Data Table Component (Search, Sort, Paginate, Row Selection)
- [x] Export to PDF/Excel UI

### 👤 Client Portal
- [x] Login Page (Client/Admin Toggle + Branding)
- [x] Profile / Update Page (Company Details + Password Reset)
- [x] Stock Summary Page (Exact Columns: Item #, WH, Expiry, etc.)
- [x] Stock Details Page (Drill-down view: Pallet #, Quantity per Pallet)
- [x] Withdraw Request Page (Dynamic Rows + Unified Date Logic)
- [x] Withdraw Request List (Order History + Animated Status Badges) - **DONE**
- [x] Pallet Movement Page (Historical Ledger) - **DONE**

### 🔑 Admin Portal
- [x] User Management (Account Creation + Password Reset Dialogs)
- [x] Admin Stock Summary (Global Filter by Customer) - **DONE**
- [ ] Admin Withdraw Request List (Global Order List)
- [x] SO Confirmation Page (Multi-Admin Lock + SAP Sync)

### 🚀 Future Modules (Placeholders)
- [x] Inbound / Packing List Submission
- [x] Logistics & Forwarding
- [x] Billing

## 🚀 Deployment (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com/).

### Standard Deployment
1.  **Push to GitHub/GitLab/Bitbucket:** Ensure your local changes are committed and pushed to your repository.
2.  **Connect to Vercel:**
    -   Log in to the Vercel Dashboard.
    -   Click **"Add New"** > **"Project"**.
    -   Import your repository.
3.  **Configure Project:**
    -   **Framework Preset:** Next.js (automatically detected).
    -   **Root Directory:** `./`
    -   **Build Command:** `next build`
    -   **Output Directory:** `.next`
    -   **Install Command:** `npm install`
4.  **Deploy:** Click the **"Deploy"** button.

### Manual CLI Deployment
If you have the Vercel CLI installed:
```bash
npm install -g vercel
vercel
```

---

## 🏗️ Design Principles
1. **Cold Chain Aesthetic:** Clean, high-contrast UI using Navy (#1e3a8a) and Ice Blue colors.
2. **Contextual Alerts:** Expiry dates and stock levels use semantic color coding.
3. **Efficiency:** Table pagination resets on search; bulk actions for dates and order processing.
