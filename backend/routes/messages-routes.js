import express from 'express';
import { protectRoute } from '../middlewares/auth.js';
import { sendMessage, getConversations } from '../controllers/messagesController.js';
const router = express.Router();
router.post('/send',protectRoute,sendMessage);
router.get('/conversation/:userId',protectRoute,getConversations);
export default router;