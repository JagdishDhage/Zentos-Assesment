import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const UserController = {
  Register: async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Enter all data" });
      }
      const isuser = User.findOne({ email });
      if (isuser) {
        return res.status(400).json({ message: "User already exist" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      const token = await jwt.sign(
        { userId: user._id, email: user.email },
        process.env.SECREATE
      );

      await res.cookie("token", token, {
        httpOnly: true,
      });

      res.status(201).json({ message: "User created" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error", error: err.message });
    }
  },
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
console.log(req.body)
      if (!email || !password) {
        return res.status(400).json({ message: "Enter all data" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

     
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECREATE);

    
      res.cookie("token", token, {
        httpOnly: true, 
     
      });

     
      res.status(200).json({
        token: token, 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  logout: async (req, res) =>{
    try{
      res.clearCookie("token");
      res.status(200).json({ message: "Logged out" });
      
    }catch(e){
      console.error(e);
    }
  }
}
export default UserController;
