type GetClinicPetsResponse = {
  petList: {
    id: string;
    name: string;
    gender: string;
    birth_date: string;
    client: {
      id: string;
      user: {
        first_name: string;
        last_name: string;
      };
    };
  }[];
};
