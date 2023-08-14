import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/User';
import { connectToDB } from'utils/database';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({ session}) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

    },
    async signIn({ profile}) {
        try {
            await connectToDB();
            //check if user exists
            const userExists = await User.findOne({
                email: profile.email
        });

            //if not create a new user
            if (!userExists) {
                await User.create ({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    imamge: profile.picture
                })
            }

            return true;

        } catch (error) {
            console.log(error);
            return false;

        }

    }
})