import User from "./user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { decodeJWTToken } from "../../utils/decodeJWTToken.js";
dotenv.config();

const userResolvers = {
  Query: {
    currentUser: async (_, __, context) => {
      if (!context.user) return null;
      else {
        const user = await User.findById(context.user.id);
        return { id: user._id, username: user.username };
      }
      // const result = await decodeJWTToken(context.token);
      // console.log(result);
    },
  },
  Mutation: {
    async register(_, { username, password }) {
      const existingUser = await User.findOne({ username });
      if (existingUser) throw new Error("User already exists");

      const user = new User({ username, password });
      await user.save();
      return { id: user._id, username: user.username };
    },
    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return { message: "Login successful", token: token };
    },
  },
};

export default userResolvers;
