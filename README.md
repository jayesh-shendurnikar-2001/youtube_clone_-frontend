# YouTube Clone - Frontend

## 📌 Project Overview

This is the **frontend of a YouTube Clone application** built using **React.js and Vite**.
The application allows users to register, login, create channels, upload videos, watch videos, comment, and explore other channels similar to YouTube.

---

## 🚀 Features

* User Authentication (Login / Register)
* Create and Edit Channels
* Upload Videos
* Watch Videos
* Comment on Videos
* Filter Videos
* Responsive Header and Sidebar
* Video Cards with Views and Upload Time
* Error Handling Pages

---

## 🛠️ Tech Stack

* React.js
* Vite
* JavaScript (ES6)
* React Router DOM
* Context API (Authentication)
* Axios (API Calls)
* Tailwind CSS / CSS

---

## 📂 Project Structure

```
src
│
├── api
│   └── api.js              # Axios API configuration
│
├── components
│   ├── CommentSection.jsx
│   ├── FilterButtons.jsx
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   └── VideoCard.jsx
│
├── context
│   └── authContext.jsx     # Authentication Context
│
├── pages
│   ├── ChannelPage.jsx
│   ├── CreateEditVideo.jsx
│   ├── ErrorPage.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── VideoPlayer.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

🔗 Backend Repository

This frontend works with the following backend API:

Backend GitHub Repository:
https://github.com/jayesh-shendurnikar-2001/youtube_clone_backend

Make sure the backend server is running before starting the frontend.

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/jayesh-shendurnikar-2001/youtube_clone_-frontend.git
```

### 2️⃣ Navigate to project

```bash
cd youtube-clone-frontend
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the development server

```bash
npm run dev
```

Application will run at:

```
http://localhost:5173
```

---

## 🌐 API Configuration

API base URL is configured in:

```
src/api/api.js
```

Example:

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export default API;
```

Make sure the **backend server is running** before using the application.

---

## 📸 Main Pages

| Page              | Description              |
| ----------------- | ------------------------ |
| Home              | Displays all videos      |
| Login             | User login page          |
| Register          | User registration        |
| Channel Page      | Shows channel details    |
| Video Player      | Watch video and comments |
| Create/Edit Video | Upload or update videos  |

---

## 📱 Responsive Design

The application supports:

* Desktop
* Tablet
* Mobile devices

---

## 👨‍💻 Author

Developed by **Jayesh Shendurnikar**

---
