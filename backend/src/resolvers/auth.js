import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await Admin.findById(user.id);
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const admin = await Admin.findOne({ email });
      if (!admin) throw new Error("Admin not found");

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) throw new Error("Invalid password");

      const token = generateToken(admin);

      return { token, admin };
    },
  },
};

export default resolvers;