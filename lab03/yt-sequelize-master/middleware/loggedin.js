const jwt = require('jsonwebtoken');

module.exports = function loggedin(req, res, next) {
  // Get auth header value
  console.log("loggedin edhukse");
  const token = req.header('auth-token');
    // Check if not token
    if (!token) {
        console.log("1");
        return res.status(407).json({ msg: 'No token, authorization denied' });
        }
    // Verify token
    try {
      console.log("2");

        const decoded = jwt.verify(token, process.env.TOKEN);
        req.borrower = decoded;
        next();
    }
    catch (err) {
        res.status(505).json({ msg: 'Token is not valid' });
    }

  } 
