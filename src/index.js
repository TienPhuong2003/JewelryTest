const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes');
const db = require('./config/db');

// env environments
require('dotenv').config();

// kết nối db
db.connectDB();

// Cấu hình CORS cho phép mọi nguồn gốc
app.use(cors());

// cấu hình static file
app.use(express.static('public'));

// Middleware để phân tích body JSON
app.use(express.json());

// Xử lý routes
routes(app);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// global exception
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// env environments
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
