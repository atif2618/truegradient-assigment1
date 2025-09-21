// // const express = require('express');
// // const router = express.Router();
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const User = require('../model/usermodel');

// // const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';




// // router.post('/signup', async (req, res) => {
// //   const { username, email, password } = req.body;
// //   if (!username || !email || !password) return res.status(400).json({ message: 'Missing fields' });

// //   const existing = await User.findOne({ $or: [{ username }, { email }] });
// //   if (existing) return res.status(400).json({ message: 'Username or email already taken' });

// //   const passwordHash = await bcrypt.hash(password, 10);
// //   const user = new User({ username, email, passwordHash, credits: 10 });
// //   await user.save();

// //   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
// //   res.json({
// //     token,
// //     user: { id: user._id, username: user.username, email: user.email, credits: user.credits }
// //   });
// // });
  
// // router.post('/signin', async (req, res) => {
// //   const { identifier, password } = req.body; 
// //   if (!identifier || !password) return res.status(400).json({ message: 'Missing fields' });


// //   const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
// //   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

// //   const ok = await bcrypt.compare(password, user.passwordHash);
// //   if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

// //   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
// //   res.json({
// //     token,
// //     user: { id: user._id, username: user.username, email: user.email, credits: user.credits }
// //   });
// // });


// // module.exports = router;


 const express = require('express');
 const router = express.Router();
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const User = require('../model/usermodel');

 const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';


// router.post('/signup', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ message: 'Missing fields' });

//   const existing = await User.findOne({ email });
//   if (existing)
//     return res.status(400).json({ message: 'Email already taken' });

//   const passwordHash = await bcrypt.hash(password, 10);
//   const user = new User({ email, passwordHash, credits: 10 });
//   await user.save();

//   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
//   res.json({
//     token,
//     user: { id: user._id, email: user.email, credits: user.credits }
//   });
// });


// router.post('/signin', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ message: 'Missing fields' });

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//   const ok = await bcrypt.compare(password, user.passwordHash);
//   if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

//   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
//   res.json({
//     token,
//     user: { id: user._id, email: user.email, credits: user.credits }
//   });
// });

// module.exports = router;


router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: 'Email already taken' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ email, passwordHash, credits: 10 });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user._id, email: user.email, credits: user.credits }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user._id, email: user.email, credits: user.credits }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router; 

