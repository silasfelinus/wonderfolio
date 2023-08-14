import mongoose from 'mongoose';

let isConnected = false;

export const ConnectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'sharePrompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;

        console.log('MongoDB Connected)')

        } catch (error) {
            console.log(error);

    }
}
