

// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true }, // added email
//   passwordHash: { type: String, required: true },
//   credits: { type: Number, default: 10 },
//   notifications: [
//     {
//       title: String,
//       body: String,
//       read: { type: Boolean, default: false },
//       createdAt: { type: Date, default: Date.now }
//     }
//   ]
// });

// module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  credits: { type: Number, default: 10 },
});

module.exports = mongoose.model('User', UserSchema);

