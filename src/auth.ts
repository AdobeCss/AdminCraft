// src/pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },



      
      async authorize(credentials) {
        const res = await fetch('https://your-external-api.com/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });

        if (!res.ok) {
          throw new Error('Invalid credentials');
        }

        const user = await res.json();
        return user; // Make sure the user object is correctly returned
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
});
