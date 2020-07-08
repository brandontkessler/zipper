const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async function(req, res, next) {
  try {
    const user = await User.create(req.body);
    const { id, email } = user;
    const token = jwt.sign(
      { email }, 
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      id,
      token
    })
  } catch(err) {
    return next({
      status: 400,
      message: 'Authentication failed'
    })
  }
}

exports.signin = async function(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const { id, email } = user;
    const isMatch = await user.comparePassword(req.body.password)

    if(isMatch) {
      let token = jwt.sign(
        {
          id,
          email
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        email,
        token
      });
    }
    return next({status: 400, message: 'Auth failed'})    
  } catch(e) { return next({status: 400, message: 'Auth failed'}) }
}
