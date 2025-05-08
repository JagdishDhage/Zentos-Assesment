import jwt from "jsonwebtoken";

const Auth = (req, res, next) => {
  try {
   
    const token = req.cookies.token;
    console.log(res.cookies)
    if (!token) {
      return res.status(401).json({ message: "Login first" });
    }

    
    const decoded = jwt.verify(token, process.env.KEY);

    console.log('1')
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Not valid" });
  }
};

export default Auth;
