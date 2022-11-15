import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import "dotenv/config";


const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  role: {type: String, enum: ["user","admin"], default: "user"},
  blocked: {type: Boolean, default: false},
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date }
});

userSchema.methods.getTokenFromUserModel = function() {
  const {JWT_SECRET_KEY,EXPIRES_IN} = process.env;
  
  const payload = {
      id : this._id,
      name : this.name
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn : EXPIRES_IN});

  return token;
};


userSchema.methods.getResetPasswordToken = function () {
  const randomHexString = crypto.randomBytes(15).toString("hex");

  const resetPasswordToken = crypto
  .createHash("SHA512")
  .update(randomHexString)
  .digest("hex");

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpire = Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE);

  return resetPasswordToken;
}


// userSchema.methods.preventBlockedUserActions = function () {
//   if(this.blocked) {

//   }
// }

const UserModal = mongoose.model("User", userSchema);

export default UserModal;
