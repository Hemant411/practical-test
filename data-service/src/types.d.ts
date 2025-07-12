import mongoose from "mongoose";

interface IProfile extends mongoose.Document {
    userId: string;
    name: string;
    age: number;
}