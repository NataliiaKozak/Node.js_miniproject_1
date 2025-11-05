import express from 'express';
import { getDB } from '../db/index.js';
import authToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authToken, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(401).json({ message: 'title and content are required' });
  }
  try {
    const db = getDB();
    const newPost = {
      title,
      content,
      author: req.user.userId,
      createdAt: new Date(),
    };
    const result = await db.collection('posts').insertOne(newPost);
    res.status(201).json({ ...newPost, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating post: ', error);
    res.status(500).json({ message: 'Server error when creating a post' });
  }
});

router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const posts = await db.collection('posts').find().toArray();
    res.json(posts);
  } catch (error) {
    console.error('Error receiving posts: ', error);
    res.status(500).json({ message: 'Server error when receiving posts' });
  }
});

export default router;
