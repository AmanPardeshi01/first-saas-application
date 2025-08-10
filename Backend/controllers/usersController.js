import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Registration
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Define trial period (default to 14 days)
        const trialPeriod = 14;

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            trialExpires: new Date(Date.now() + trialPeriod * 24 * 60 * 60 * 1000)
        });

        // Save the user
        await newUser.save();

        // Send response
        res.status(201).json({
            status: true,
            message: "Registration successful",
            user: {
                username,
                email,

            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        //Check for the user
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        //Check for the pasword
        const isMatch = await bcrypt.compare(password, user?.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
        }

        //Generate the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log(token);

        // //Set the token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        //Send the resposne
        res.status(200).json({
            status: "success",
            message: "Login Success",
            _id: user._id,
            username: user.username,
            email: user.email,
        })


    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

//User Logout
const logout = async (req, res) => {
    res.cookie("token", "", {maxAge: 1 });
    res.status(200).json({
        status: "success",
        message: "Logout successful"
    });
}

// User Profile
const userProfile = async (req, res) => {
    try {
        const id = "689855fef6c744d7d9edf957";
        const user = await User.findById(id); // ✅ Corrected

        if (user) {
            res.status(200).json({
                status: "success",
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                }
            });
        } else {
            res.status(404).json({ message: "User not found" }); // Better status code
        }
    } catch (error) {
        console.error("User profile error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export { register, login, logout, userProfile };
