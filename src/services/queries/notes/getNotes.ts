import { nhostClient } from "@/providers/app_nhost_provider";
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
