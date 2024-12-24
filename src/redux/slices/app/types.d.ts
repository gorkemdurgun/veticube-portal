type SetActiveBranchRequestPayload = {
  branch_id: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

type SetActiveBranchSuccessPayload = {
  branch_id: string;
  branch_clients: BranchClients[];
  // breed_list: Breed[];
};

type BranchClients = {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  created_at: string;
  pets: {
    id: string;
    name: string;
    birth_date: string;
    breed: Breed;
  };
}[];

type Breed = {
  id: string;
  breed: string;
  species: string;
};
