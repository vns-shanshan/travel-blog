const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    enum: ["⭐", "⭐⭐", "⭐⭐⭐"],
    required: true,
  },
  photo: {
    type: String,
  },
  dateVisited: {
    type: String,
    required: true,
  },
  estimatedCost: {
    type: Number,
  },
  content: {
    type: String,
  }
})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [postSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
