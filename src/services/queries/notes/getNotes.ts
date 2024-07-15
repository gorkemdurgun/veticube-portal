import { gql } from "@apollo/client";

type GetNotesQuery = {
  notes: {
    note: string;
  }[];
};

export const NOTES = gql`
  query {
    notes {
      note
    }
  }
`;
