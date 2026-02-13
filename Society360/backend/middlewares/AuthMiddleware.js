const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}

module.exports.protect = async (req, res, next) => {
  let token = req.cookies.token;
  
  console.log('=== Auth Middleware Debug ===');
  console.log('Cookies:', req.cookies);
  console.log('Authorization header:', req.headers.authorization);
  
  // Check Authorization header if token not in cookies
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
      console.log('Token found in Authorization header');
    }
  }
  
  if (!token) {
    console.log('No token found!');
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }
  
  console.log('Token found:', token.substring(0, 20) + '...');
  
  jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
    if (err) {
      console.log('JWT verification error:', err.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('User not found with id:', decoded.id);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User authenticated:', user.email, 'unitId:', user.unitId, 'role:', user.role);
    req.user = {
      _id: user._id,
      id: user._id,
      unitId: user.unitId,
      email: user.email,
      username: user.username,
      role: user.role
    };
    next();
  });
};

const protectAdmin = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, no token' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized' 
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Admin access required' 
    });
  }
};

module.exports.protectAdmin = protectAdmin;
module.exports.adminOnly = adminOnly;