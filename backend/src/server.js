import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-express";
import app from "./app.js";
import { connectDB } from "./config/db.js";

import typeDefs from "./schema/auth.js";
import resolvers from "./resolvers/auth.js";
import { authMiddleware } from "./middleware/auth.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: authMiddleware,
    });

    await server.start();
    server.applyMiddleware({ app });
    // applyMiddleware is a method provided by Apollo Server to integrate it with an existing Express application. It allows you to specify the path where the GraphQL server will be accessible (default is "/graphql") and any additional options.

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();