import express from 'express';
import { protectRoute } from '../middlewares/auth.js';
import { signup,login,logout } from '../controllers/authControllers.js';
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute,(req,res) => {
    res.send({
        success: true,
        user: req.user
    })

});
export default router;