# 📸 SHUTTERSNAP


> *" still capturing."*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Website-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://shuttersnap.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Shuttersnap** is a full-stack digital gallery and photography portfolio. Built to bridge the gap between cinematic visual storytelling and modern web engineering, this digital space displays curated collections with fluid animations, dynamic cloud asset management, and an interactive client feedback system.

---

## 🌐 Live Deployment

Explore the live visual experience: **[https://shuttersnap.vercel.app](https://shuttersnap.vercel.app)**

---

## 🖼️ Visual Sneak Peek

| Cinematic Hero Section | Dynamic Collection Scrubber | Native Lightbox Experience |
| :---: | :---: | :---: |
| ![Hero Preview](./public/window.svg) | ![Collections Preview](./public/window.svg) | ![Lightbox Preview](./public/window.svg) |

*(Tip: Drop your actual website screenshots into your `/public` folder and swap `./public/window.svg` with your screenshot filenames!)*

---

## ✨ Key Features

* **🎞️ Dynamic Infinite Marquees:** Homepage preview rows automatically fetch, randomize, and infinitely scroll through the photographic library using custom CSS animations.
* **🖱️ Interactive Cover Scrubber:** Hovering over album cards smoothly scrubs through a preview pool of recent category uploads.
* **⚡ AI-Powered Media Optimization:** Integrates Cloudinary API transformations for on-the-fly image cropping, auto-quality formatting (`q_auto, f_auto`), and rapid CDN delivery.
* **🪟 Native Performance Lightbox:** Uses HTML5 `<dialog>` elements combined with backdrop blur for a lightweight, zero-layout-shift fullscreen viewing experience.
* **🛡️ Bulletproof Feedback Portal:** Client review portal backed by Google Firebase Firestore, protected by client-side validation, rate-limiting, and hidden honeypot spam traps.
* **🌗 Absolute Theme Control:** Custom context provider guaranteeing seamless transitions between crisp editorial White and cinematic Gallery Black.

---

## 🛠️ Built With

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 & Next.js 16 (App Router) | Core UI, Server-Side Rendering & API Routes |
| **Styling** | Tailwind CSS v4 & Framer Motion | Editorial layout, responsive design & motion |
| **Media CDN** | Cloudinary SDK | Dynamic asset storage, folder search & compression |
| **Database** | Firebase Firestore | Secure client feedback storage |
| **Deployment** | Vercel Platform | Edge network hosting |

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone [https://github.com/Rohitkumarpradhan/shuttersnap.git](https://github.com/Rohitkumarpradhan/shuttersnap.git)
cd shuttersnap
