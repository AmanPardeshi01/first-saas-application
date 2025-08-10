import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
        const { email, password} = req.body
        const user = await User.findOne({email});
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
        //Set the token in cookie

        //Send the resposne
        res.status(200).json({
            status: "success",
            message:"Login Success",
            _id: user._id,
            username:user.username,
            email:user.email,
        })


    } catch (error) {

    }
}

export { register, login };
