const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
});

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) return next()
    let hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed
    
    return next();
  } catch(err) { return next(err) }
})

userSchema.methods.comparePassword = async function (enteredPassword, next) {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) { return next(error) }
}

module.exports = mongoose.model("User", userSchema);