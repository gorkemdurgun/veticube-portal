"use client";

import { svg } from "@/assets";
import { PatientList, PatientListHeaderCard, SearchFilterBox, SearchPatientInput } from "@/components/patients";
import { useAppQuery } from "@/hooks";
import { useEffect, useState } from "react";

import { PiPlusCircleDuotone as AddIcon, PiMagnifyingGlassDuotone as ViewIcon } from "react-icons/pi";

const PatientsPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [filters, setFilters] = useState<Record<string, string | undefined>>();

  const { data, loading, error } = useAppQuery("GetClinicPets", {
    context: {
      headers: {
        "x-hasura-role": "manager",
      },
    },
  });

  useEffect(() => {
    console.log("Search results:", searchResults);
  }, [searchResults]);

  useEffect(() => {
    console.log("Filters:", filters);
  }, [filters]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <PatientListHeaderCard
            className="col-span-2 lg:col-span-1"
            image={svg.pack3.AidPaw2}
            label="Registered Patients"
            count={20}
            button={{ icon: AddIcon, onClick: () => console.log("Add new patient") }}
            chartData={[
              { date: "2021-10-01", value: 1 },
              { date: "2021-10-02", value: 1 },
              { date: "2021-10-03", value: 7 },
              { date: "2021-10-04", value: 2 },
            ]}
          />
          <PatientListHeaderCard
            className="col-span-1"
            image={svg.pack3.Magnify}
            label="Arrival Today"
            count={4}
            button={{ icon: ViewIcon, onClick: () => console.log("View today's arrivals") }}
          />
          <PatientListHeaderCard
            className="col-span-1"
            image={svg.pack3.Icu}
            label="In ICU"
            count={2}
            button={{ icon: ViewIcon, onClick: () => console.log("View patients in ICU") }}
          />
        </div>
        <div className="overflow-y-auto grid grid-cols-[1fr,160px] lg:grid-cols-[1fr,200px] gap-4">
          <div className="flex flex-col gap-4">
            <SearchPatientInput onSearchDone={setSearchResults} />
            <PatientList data={data?.petList} />
          </div>
          <SearchFilterBox onFilterChange={setFilters} />
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
