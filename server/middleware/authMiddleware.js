const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token)
    res
      .status(401)
      .json({ msg: 'No token present - you have to be authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res
      .status(400)
      .json({ msg: 'Token is not valid - you have to be authenticated' })
      .json(e);
  }
};

module.exports = authMiddleware;
