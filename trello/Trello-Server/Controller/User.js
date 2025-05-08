import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Auth = {
  Register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      console.log(req.body);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      const hashpass = await bcrypt.hash(password, 10);

      const newUser = new User({ username, email, password: hashpass });
      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.KEY,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: "lax",
      });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  },

  Login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = await jwt.sign(
        { id: user._id, role: user.role },
        process.env.KEY
      );

      res.cookie("token", token, {
        httpOnly: true,

        secure: false, // Set to true if using HTTPS
        sameSite: "lax",
      });

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  },

  Logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  },
  getUserData: async (req, res) => {
    try {
      const userId = req.user.id; // Get the logged-in user's ID

      // Fetch user and populate the boards field
      const user = await User.findById(userId).populate("boards");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Respond with the user data, including populated boards
      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default Auth;
