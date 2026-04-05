import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Admin {
    id: ID!
    email: String!
    role: String!
  }

  type AuthResponse {
    token: String!
    admin: Admin!
  }

  type Query {
    me: Admin
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse!
  }
`;

export default typeDefs;