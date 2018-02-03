const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({

  username:{
    type: String,
    unique: [true,"email already exist"]
  },

  email:{
    type: String,
    unique: [true,"email already exist"]
  },
  password:{
    type: String,
    unique: [true,"password already exist"]
  },
  
  summary: String,
  imageUrl: String,
  company: String,
  jobTitle: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;