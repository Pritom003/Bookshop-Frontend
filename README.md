# Chapters & Co. - Frontend

Welcome to the **Chapters & Co.** frontend repository! This is the frontend of a bookshop project built with **React, Redux, Ant Design, Tailwind CSS, and TypeScript**.

## 🚀 Features
- **MERN Stack**: Integrated with a MongoDB, Express.js, React, and Node.js backend.
- **Modern UI/UX**: Designed using **Ant Design** with Tailwind CSS for additional styling.
- **Authentication**: User login and registration implemented.
- **Book Listings**: Fetches book data from the backend.
- **Admin Dashboard**: Allows sellers to post books to the database.
- **Cart & Payment System**: Users can add books to the cart and proceed with checkout.
- **Fully Responsive**: Optimized for all screen sizes.
- **Dark Overlay Hero Section**: Beautiful introduction to the bookshop.

## 🛠 Tech Stack
- **Frontend**: React, TypeScript, Ant Design, Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **Routing**: React Router DOM
- **Backend**: Node.js, Express.js, MongoDB (Handled in a separate repository)

## 📂 Folder Structure
```
src/
│── assets/                # Images and icons
│── components/            # Reusable components
│   ├── layout/
│   │   ├── mainlayout/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │
│── ui/                    # UI-related components
│── pages/                 # Application pages
│── hooks/                 # Custom React hooks
│── redux/                 # Redux store and slices
│── routes/                # Route definitions
│── utils/                 # Utility functions
│── App.tsx                # Main app component
│── main.tsx               # Entry point
│── index.tsx              # Renders the app
```

## 📌 Installation & Setup
### 1️⃣ Clone the repository:
```sh
git clone https://github.com/Pritom003/Bookshop-Frontend.git

cd BOOKSHOP-FRONTEND
```

### 2️⃣ Install dependencies:
```sh
yarn install  # or npm install
```

### 3️⃣ Start the development server:
```sh
yarn dev  # or npm run dev
```

### 4️⃣ Build for production:
```sh
yarn build  # or npm run build
```

## 🌍 Environment Variables
Create a `.env` file in the root directory and add the necessary environment variables:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🔗 API Integration
The frontend interacts with the backend to:
- Fetch book data
- Handle authentication
- Process payments
- Manage cart functionality

## 📸 UI Overview
- **Navbar**: Responsive with a transparent-to-black transition on scroll.
- **Hero Section**: Dark overlay with a shop name, motto, and call-to-action button.
- **Book Listings**: Displayed with search and filtering options.
- **Admin Dashboard**: Allows book posting and management.
- **Cart & Checkout**: Secure payment integration.

## 👥 Contributors
- **[Your Name]** - Developer

## 📜 License
This project is licensed under the MIT License.

---
Happy coding! 🚀
