import mongoose from "mongoose";
import { IProfile } from "../types";

const ProfileSchema = new mongoose.Schema({
    userId: String,
    name: String,
    age: Number
});

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);