import express from 'express';
import bcrypt from 'bcrypt';
import { getDB } from '../db/index.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(401)
      .json({ message: 'Username and Password are required' }); //лучше json вместо join
  }

  try {
    const hashPass = await bcrypt.hash(password, 10); //хеширование пароля
    const db = getDB();
    await db.collection('users').insertOne({ username, password: hashPass }); //создание пользователя
    res.status(201).json({ message: 'User has been created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error, user can`t be created' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and Password are required' });
  }
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ token });
  } catch (error) {
    console.error('Error login in user: ', error);
    res.status(500).json({ message: 'Server error login user' });
  }
});

export default router;

// import express from 'express';
// const router = express.Router();

// router.post('/register', (_, res) => {
//     res.send('User registered');
// });

// router.post('/login', (_, res) => {
//     res.send('User logged in');
// });
// export default router;
