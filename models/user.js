import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = this.constructor.encryptPassword(this.password);
  next();
});

userSchema.methods = {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

userSchema.statics = {
  makeSalt() {
    return bcrypt.genSaltSync(10);
  },
  encryptPassword(password) {
    if (!password) {
      return '';
    }
    return bcrypt.hashSync(password, this.makeSalt());
  },
  register(email, password, cb) {
    const User = this;

    const user = new User({
      email,
      password,
    });
    user.save((err) => {
      cb(err, user);
    });
  },
};

userSchema
  .path('email')
  .validate((email) => validator.isEmail(email));

userSchema
  .path('password')
  .validate((password) => validator.isLength(password, 6));

const User = mongoose.model('User', userSchema);

export default User;
