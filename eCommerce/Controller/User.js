import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserControll={
    register : async (req, res) => {
        const { name, email, password, role } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ error: 'Email already registered' });
    
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword, role });
            await user.save();
    
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    
    
    login : async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ error: 'User not found' });
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ error: 'Enter correct data' });
    
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.SECRETE_KEY,
                { expiresIn: '1d' }
            );
    
            res.json({ token, user: user.profile });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
}
export default UserControll;