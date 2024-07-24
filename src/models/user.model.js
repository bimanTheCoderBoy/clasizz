import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  password:{
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  InstituteCode:{
    type: Number,
    required: true,
    trim: true,
    default:()=>Math.floor(Math.random()*100000)
  },
  requestSend:{
    type:[{type:Schema.Types.ObjectId
      , ref:"User"
    }]
  },
  requestAccess:{
    type:[{type:Schema.Types.ObjectId
      , ref:"User"
    }]
  }
},{timestamps});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//custom methods
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const User = model("User", userSchema);
