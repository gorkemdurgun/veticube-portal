import { gql } from "@apollo/client";

export const getUsers = gql`
  subscription GetUsersStreamingSubscription {
    users {
      id
      name
    }
  }
`;
