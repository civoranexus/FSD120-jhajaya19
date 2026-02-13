const User = require("../models/User");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production', 
       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
       maxAge: 24 * 60 * 60 * 1000
     });
     res.status(201).json({ message: "User logged in successfully", success: true, token });
     next()
  } catch (error) {
    console.error(error);
  }
}

module.exports.AdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        success: false 
      });
    }

    const admin = await User.findOne({ email, role: 'admin' });
    
    if (!admin) {
      return res.status(401).json({ 
        message: 'Incorrect admin credentials', 
        success: false 
      });
    }

    const auth = await bcrypt.compare(password, admin.password);
    
    if (!auth) {
      return res.status(401).json({ 
        message: 'Incorrect password or email',
        success: false 
      });
    }

    const token = createSecretToken(admin._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ 
      message: "Admin logged in successfully", 
      success: true, 
      token,
      admin: {
        _id: admin._id,
        email: admin.email,
        username: admin.username,
        role: admin.role
      }
    });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error during admin login', 
      success: false 
    });
  }
}

// module.exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
    
//     if (!user) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid credentials' 
//       });
//     }

//     const isPasswordValid = await user.comparePassword(password);
    
//     if (!isPasswordValid) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid credentials' 
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '30d' }
//     );

//     res.json({
//       success: true,
//       message: 'Login successful',
//       data: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         unitId: user.unitId,
//         token
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error' 
//     });
//   }
// };