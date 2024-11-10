import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Session from '../models/Session.js';
import {
  secret,
  sessionExpInMSecs,
  sessionExpInSecs,
} from '../utils/helper.js';

export const registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ name, email, password, role });
    await user.save();
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(
      payload,
      secret(),
      { expiresIn: sessionExpInSecs() },
      async (err, token) => {
        if (err) throw err;
        const session = new Session({
          token,
          expiresAt: new Date(Date.now() + sessionExpInMSecs()),
        });
        await session.save();
        res.send(token);
      }
    );
  } catch (err) {
    next(err); // Pass the error to the errorHandler middleware
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(
      payload,
      secret(),
      { expiresIn: sessionExpInSecs() },
      async (err, token) => {
        if (err) throw err;
        const session = new Session({
          token,
          expiresAt: new Date(Date.now() + sessionExpInMSecs()),
        });
        await session.save();
        res.send(token);
      }
    );
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res) => {
  try {
    const result = await Session.deleteOne({ token: req.token });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Session not found' }); // Error if session not found
    }

    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Error logging out:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const verifyToken = async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const session = await Session.findOne({ token });
    if (!session) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    jwt.verify(token, secret(), (err, decoded) => {
      console.log({ err });
      if (err) {
        return res
          .status(500)
          .json({ message: 'Failed to authenticate token' });
      }
      res.json({ message: 'Token is valid', user: decoded.user });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
