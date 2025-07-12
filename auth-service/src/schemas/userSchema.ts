import mongoose from "mongoose";
import { IUser } from "../types";

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true
    },
    password: String
  });
  
export const User = mongoose.model<IUser>('User', UserSchema);