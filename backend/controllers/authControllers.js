
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
const signToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
export const signup = async(req, res) => {
    const { name, email, password, age, gender, genderPreference } = req.body;
try {
if(!name || !email || !password || !age || !gender || !genderPreference) {
    return res.status(400).json({ 
        success: false,
        message: "Please fill all fields" });

    }
if(age < 18) {
    return res.status(400).json({ 
        success: false,
        message: "You must be at least 18 years old to sign up" });
}
if(password.length < 6) {
    return res.status(400).json({ 
        success: false,
        message: "Password must be at least 6 characters long" });
}
const newUser=await User.create({
    name,
    email,
    password,
    age,
    gender,
    genderPreference
})
const token = signToken(newUser._id);
res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day 
    httpOnly: true, // This makes the cookie inaccessible to JavaScript on the client side
    sameSite: "strict", // This helps prevent CSRF attacks
    secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS

})
res.status(201).json({
    success: true,
    user: newUser,
    message: "User created successfully"
});
}
catch (error) {
    console.error(error);
    res.status(500).json({ 
        success: false,
        message: "Server error" });
}
} 
export const login = async(req, res) => {
    const { email, password } = req.body;
try {
if(!email || !password) {
    return res.status(400).json({ 
        success: false,
        message: "Please fill all fields" });
}
const user = await User.findOne({ email }).select("+password");
if(!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" });
}
const token = signToken(user._id);
res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day 
    httpOnly: true, // This makes the cookie inaccessible to JavaScript on the client side
    sameSite: "strict", // This helps prevent CSRF attacks
    secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS

})
res.status(200).json({
    success: true,
    user,
    message: "Logged in successfully"
})
}
catch (error) {
    console.error(error);
    res.status(500).json({ 
        success: false,
        message: "Server error" });
}
}
export const logout = (req, res) => {
res.clearCookie("jwt")
res.status(200).json({
    success: true,
    message: "Logged out successfully"
})
}