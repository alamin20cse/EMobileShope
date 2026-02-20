# 📱 E-Mobile Shop

A full-stack **E-Commerce Web Application** for buying and selling mobile phones online.  
Built with **React.js (Frontend)** and **Django REST Framework (Backend)**, integrated with **Stripe Payment Gateway** for secure transactions.

---

## 🌐 Live Demo
👉 [Click Here to Visit Live Project](https://emobileshope.netlify.app)

---

## 🌐 Admin link
👉 [Click Here to Visit Admin site]([https://emobileshope.netlify.app](https://emobileshope.onrender.com/admin/))

---

## ✨ Features

- 🛒 Browse mobile products by category and search  
- 📄 Detailed product information with specs & reviews  
- 👤 User Authentication (Login, Signup, JWT)  
- 🛍️ Add to Cart & Manage Orders  
- 💳 Online Payment Integration (Stripe / SSLCommerz)  
- ⭐ Product Review System  
- 📱 Responsive UI with Tailwind CSS  
- 🔒 Secure API with JWT Authentication  
- 🔍 Advanced search functionality
- 🎞️ Carousel / Swiper for featured products
- 🎨 Lottie Animations for loading & empty states
- 🔔 SweetAlert2 for interactive alerts
- 📄 PDF generation for invoices & order summary


---
## 👨‍💼 Admin Credentials
For testing admin features,

## Email: alamin@gmail.com

## Password :1234

---



## 🛠️ Tech Stack

**Frontend:**
- React.js  
- Tailwind CSS  
- Axios  
- React Router DOM  
- Tanstack Query (React Query)  

**Backend:**
- Django  
- Django REST Framework (DRF)  
- JWT Authentication  
- Stripe API  
- MySQL (as DB)  

**Tools:**
- Git & GitHub  
- VS Code  
- Postman  




---




## ⚙️ Installation & Setup

## 1️. Clone the Repository
```bash
git clone https://github.com/alamin20cse/EMobileShope.git

```
## 2️. Backend Setup

```

cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
## 3. Backend .env setup
```
DB_USER=root
DB_PWD=your_password
DB_HOST=localhost
DB_PORT=3306

STRIPE_SECRET_KEY='your_secret_key'
```

# Frontend Setup (React + Vite)
```
cd frontend
npm install
npm run dev
```
## Frontend .env.local
```
VITE_BASE_URL=https://emobileshope.onrender.com
VITE_Payment_Gateway_PK='your_publishable_key'

```


## home page
![Home Page](https://i.ibb.co/fGq352jB/image.png)

## Dashboard 
![Dashboard](https://i.ibb.co.com/cKHQtJCz/image.png)

## Order details and Payment page
![Dashboard](https://i.ibb.co.com/JjStvCML/image.png)




