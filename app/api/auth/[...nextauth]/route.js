import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider([
            clientId: '598165893820-m1mitv6sp8ltq58grlla1a7n5qhekvlv.apps.googleusercontent.com',
            clientSecret: '',
        ])
    ],
    async session({ session}) {

    },
    async signIn({ profile}) {

    }
})