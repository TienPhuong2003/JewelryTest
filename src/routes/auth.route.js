const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model.js'); // Đường dẫn tới mô hình User
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo tài khoản thành công
 *       400:
 *         description: Lỗi khi tạo tài khoản
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra xem tên người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo tài khoản mới
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Tạo tài khoản thành công' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi tạo tài khoản', error });
  }
});

module.exports = router;
