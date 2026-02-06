# Velora Bags - E-commerce Platform

A modern, high-performance e-commerce application built with React, TypeScript, and Firebase. This project features a robust admin dashboard, real-time data synchronization, and an optimistic UI for instant user feedback.

## 🚀 Features

- **Modern Tech Stack**: Built with React 18, TypeScript, and Vite for lightning-fast performance.
- **Optimistic UI**: Instant feedback on Create/Update/Delete operations with background synchronization.
- **Real-time Data**: Powered by Cloud Firestore for live updates across all devices.
- **Admin Dashboard**: Comprehensive product management, sales tracking, and inventory control.
- **Responsive Design**: Fully responsive UI/UX designed with mobile-first principles.
- **Secure Authentication**: Robust authentication system managed by Firebase Auth.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **State Management**: Zustand
- **Backend/Database**: Firebase (Firestore, Auth, Storage)
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Velora_Bags-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components (Atomic design)
├── hooks/          # Custom React hooks
├── pages/          # Route components (Admin & Shop)
├── services/       # API and Firebase service layer
├── store/          # Global state management (Zustand)
├── types/          # TypeScript interfaces and types
└── utils/          # Helper functions and constants
```

## 🔐 Security

- All sensitive keys are stored in environment variables.
- Firestore security rules (to be configured) ensure data integrity.
- Authentication is required for all admin routes.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
