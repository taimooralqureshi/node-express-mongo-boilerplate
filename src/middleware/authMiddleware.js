import jwt from 'jsonwebtoken';
import Session from '../models/Session.js';
import { secret } from '../utils/helper.js';

// Base authentication middleware
const authorizeRoles = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      return res
        .status(401)
        .json({ message: 'No token, authorization denied' });
    }

    try {
      const session = await Session.findOne({ token });
      if (!session) {
        return res.status(401).send({ message: 'Invalid or expired token' });
      }

      const decoded = jwt.verify(token, secret());
      req.user = decoded.user;
      req.exp = decoded.exp;
      req.token = token;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid', ...{ err } });
    }
  };
};

// Middleware for allowing both users and admins
const isUserAndAdmin = authorizeRoles(['user', 'admin']);

// Middleware for allowing only admins
const isAdmin = authorizeRoles('admin');

export { isAdmin, isUserAndAdmin };
