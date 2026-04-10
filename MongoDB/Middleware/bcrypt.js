const bcrypt = require ("bcrypt");
const password= "12345";
const hashedPassword= await bcrypt.hash(password,10);
console.log(hashedPassword);

// login
const isMath = await bcrypt.compare("123456",hashedPassword);
console.log(isMath);

// registration 
const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  if (password.length < 10) {
    return res.status(400).json({
      message: "Password must be at least 10 characters"
    });
  }

  next(); 
};