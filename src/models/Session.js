import mongoose from 'mongoose';
import { sessionExpInSecs } from '../utils/helper.js';

const sessionSchema = new mongoose.Schema({
  token: String,
  expiresAt: { type: Date, expires: sessionExpInSecs() }, // 1 hour TTL
});

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const Session = mongoose.model('Session', sessionSchema);

export default Session;
