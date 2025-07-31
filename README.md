# EMR Frontend

This is the frontend for the **Electronic Medical Records (EMR)** system built with **React** and **Tailwind CSS**. It interacts with a Django REST Framework (DRF) backend to manage patient registration, viewing, and updating.

---

## 🚀 Features

- Register new patients  
- View, edit and delete existing patient information  
- Modal-based UI for better experience  
- Pagination and search  
- Success/error handling  
- Responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

- **React** (with Hooks)  
- **Tailwind CSS**  
- **Axios** for API requests  
- **Heroicons** and **Headless UI** for modal and icons  
- **Django REST Framework** as the backend (running separately)

---

## 📦 Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later)
- npm or yarn
- A running instance of the [EMR Django Backend](https://github.com/Bwire2010/EMR-Patient-Registration-System-Backend)

---
## Deployed Link
https://emr-patient-registration-system-fro.vercel.app/login


## 🔧 Installation & Setup

### 1. Clone the frontend repository

```bash
git clone git@github.com:Bwire2010/EMR-Patient-Registration-System--Front-end.git
cd EMR-Patient-Registration-System--Front-end
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API endpoint

Make sure the `BASE_URL` in `src/api/api.js` points to your backend URL:

```js
const BASE_URL = 'http://127.0.0.1:8000';
```

### 4. Run the development server

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔗 Backend Repository

To run the backend, clone and follow instructions in this repo:

👉 **Backend GitHub:**  
https://github.com/Bwire2010/EMR-Patient-Registration-System-Backend

---

## ✅ Example Workflow

1. Start Django backend:

```bash
python manage.py runserver
```

2. Start React frontend:

```bash
npm start
```

3. Open your browser at:

```
http://localhost:3000
```

---

## 📄 License

This project is licensed under the MIT License.
