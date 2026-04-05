# LUXE. — Boutique E-Commerce Experience

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

**LUXE.** is a portfolio-grade, high-performance e-commerce platform designed for the modern web. Built with a "Boutique-First" philosophy, it prioritizes tactile micro-interactions, editorial typography, and seamless visual transitions to create a world-class shopping experience.

---

## 📸 Preview

<p>
  <a href="https://luxe-roan.vercel.app/" target="_blank">Visit Luxe</a>
</p>

![LUXE. Boutique Experience](preview/luxe.gif)

---

## ✨ High-End Interactive Features

### 🍏 iOS-Inspired "Peek & Pop" UI
Experience 3D-touch-style interactions on the web. Hovering (or long-pressing on mobile) triggers a "Peek" state: the product card scales, gains a deep focal shadow, and subtly blurs the background to command full attention.

### 🧪 Morphing Quantity Chips
The interaction between discovery and shopping is fluid. Action buttons morph seamlessly into quantity controllers with spring-loaded physics, featuring vertical "slide-and-pop" animations for every count update.

### 💳 Intelligent Checkout & Prefill
LUXE. remembers you. The checkout flow is optimized with session-based prefill logic and integrated support for both **Stripe** and **Razorpay** payment identities.

---

## 🎨 Design System

- **Minimalist Luxury**: A clean `zinc-50` and `white` palette with `rounded-[2.5rem]` corner radiuses.
- **Product Photography**: All imagery features specialized `2rem`+ rounding to achieve a native app-like aesthetic.
- **Editorial Typography**: Wide-tracked uppercase labels (`0.25em`) and high-contrast headings.
- **Glassmorphism**: Heavy use of `backdrop-blur-3xl` for global navigation and floating action buttons.

---

## 🛠 Technical Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion 12 |
| **State Management** | Zustand (Persistent Middleware) |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jigar-Gadhia/luxe.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your keys:
   ```env
   VITE_STRIPE_PUBLIC_KEY=your_stripe_key
   VITE_RAZORPAY_KEY_ID=your_razorpay_id
   ```
4. Launch the development server:
   ```bash
   npm run dev
   ```

---

## 📐 Architecture

LUXE. is architected for scalability and performance:
- `/src/components/ui`: Atomic UI components with consistent branding.
- `/src/store`: Centralized Zustand stores for Cart, Products, and Orders.
- `/src/pages`: Context-aware route components.
- `/src/hooks`: Custom hooks for responsive detection and session management.

---

*Designed with ❤️ for premium e-commerce.*
