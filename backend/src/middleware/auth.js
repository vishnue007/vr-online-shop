import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = ({ req }) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (!token) return {}; // allow public requests

  try {
    const user = verifyToken(token);
    return { user };
  } catch (err) {
    throw new Error("Invalid token", { cause: err });
  }
};
