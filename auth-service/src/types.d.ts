import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    email: string;
    password: string;
}