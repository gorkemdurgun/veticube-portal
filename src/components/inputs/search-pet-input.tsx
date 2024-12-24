import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { Select } from "antd";

import { useAppSelector } from "@/hooks";
import { clinicQueries } from "@/services/apollo/query";

type Props = {
  //   value: string;
  onChange?: (value: string) => void;
};

const SearchPetInput: React.FC<Props> = ({ onChange }) => {
  const { assignments } = useAppSelector((state) => state.clinic);

  const [pagination, setPagination] = useState({ offset: 0, limit: 10 });
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const {
    data: branchPetsData,
    refetch: refetchBranchPets,
    loading: petsLoading,
  } = useQuery(clinicQueries.GetBranchPetRecords, {
    skip: !assignments.length,
    variables: {
      branchId: assignments[0]?.branch?.id,
      searchTerm: searchTerm ? `%${searchTerm}%` : undefined,
      limit: pagination.limit,
      offset: pagination.offset,
      isStray: undefined,
    },
  });

  return (
    <Select
      showSearch
      className="w-full"
      placeholder="Evcil Hayvan Seç"
      optionFilterProp="label"
      searchValue={searchTerm}
      options={
        branchPetsData?.records.map((pet) => ({
          label: pet.name,
          value: pet.id,
        })) || []
      }
      onChange={(value) => onChange?.(value as string)}
    />
  );
};

export default SearchPetInput;
