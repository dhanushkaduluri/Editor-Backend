import mongoose from 'mongoose';

const url='mongodb+srv://dhanushkaduluri:630356Dk@cluster0.fbxouqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export default async function connectToDB(){
    try {
        await mongoose.connect(url);
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
    }
}