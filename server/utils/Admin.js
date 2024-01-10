// Middleware to check if user is an admin
 const isAdmin = async (req, res, next) => {
    try {
    
      const user = req.user; // Replace with how you access the authenticated user
    
     
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
      }
      
      
      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = isAdmin
  