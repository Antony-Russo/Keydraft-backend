const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const USERNAME = "barath"
const PASSWORD = "12345"
const SECRET_KEY = 'jwt_secret_key';

router.post('/login', (req, res) => {
    const { username, password } = req.body;  
      
    if (username === USERNAME && password === PASSWORD) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '12h' });
      res.json({
        success: true,
        message: 'Login successful',
        token,
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

module.exports = router;