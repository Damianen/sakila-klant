# 🎬 Sakila Klant

A Node.js + Express + ejs fullstack web application for managing a film reserving system, based on the classic **Sakila** database. It provides webpages for authentication, reservations, film and actor browsing and more.
---

## 🚀 Features

* User authentication (login, register)
* Browse actors, films, categories, and reservations
* Role-based access control (protected routes)
* Centralized error handling
* Modular repository pattern for database access

---

## 📂 Project Structure

```
├── server.js               # Entry point
├── src/
│   ├── app.js              # Express app setup
│   ├── controllers/        # Route handlers (business logic)
│   ├── routes/             # Http routes
│   ├── repositories/       # Database queries
│   ├── services/           # Buisness logic
│   ├── middlewares/        # Auth, error handling, etc.
│   ├── views/              # Ejs templates
│   └── db/pool.js          # Database connection
├── package.json            # Dependencies & scripts
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sakila-klant.git
   cd sakila-klant
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables: create a `.env` file in the project root.

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=youruser
   DB_PASSWORD=yourpassword
   DB_NAME=sakila
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

---

## 🛠️ Scripts

```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
npm run test    # Start tests
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

