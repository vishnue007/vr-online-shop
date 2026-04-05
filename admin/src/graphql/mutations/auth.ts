import { gql } from "@apollo/client";

export const ADMIN_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      admin {
        id
        email
        role
      }
    }
  }
`;