import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import { userModel } from "@/models/userModel";

const handlers = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const sessionUser = await userModel.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await userModel.findOne({ email: profile.email });
        if (!userExists) {
          const newUser = new userModel({
            email: profile.email,
            image: profile.picture,
            username: profile.name.replace(" ", "").toLowerCase(),
          });
          await newUser.save();
        }
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    },
  },
});

export { handlers as GET, handlers as POST };
