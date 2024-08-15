"use client";

import { svg } from "@/assets";
import { PatientList, PatientListHeaderCard, SearchFilterBox, SearchPatientInput } from "@/components/patients";
import { useEffect, useState } from "react";

import { PiPlusCircleDuotone as AddIcon, PiMagnifyingGlassDuotone as ViewIcon } from "react-icons/pi";

const PatientsPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [filters, setFilters] = useState<Record<string, string | undefined>>();

  useEffect(() => {
    console.log("Search results:", searchResults);
  }, [searchResults]);

  useEffect(() => {
    console.log("Filters:", filters);
  }, [filters]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <PatientListHeaderCard
            image={svg.AidPaw}
            label="Registered Patients"
            count={20}
            button={{ icon: AddIcon, onClick: () => console.log("Add new patient") }}
          />
          <PatientListHeaderCard
            image={svg.PetIcu}
            label="In ICU"
            count={2}
            button={{ icon: ViewIcon, onClick: () => console.log("View ICU patients") }}
          />
          <PatientListHeaderCard
            image={svg.PetReview}
            label="Arrival Today"
            count={4}
            button={{ icon: ViewIcon, onClick: () => console.log("View today's arrivals") }}
          />
        </div>
        <div className="w-full grid grid-cols-[1fr,160px] lg:grid-cols-[1fr,200px] gap-4">
          <div className="flex flex-col gap-4">
            <SearchPatientInput onSearchDone={setSearchResults} />
            <PatientList />
          </div>
          <SearchFilterBox onFilterChange={setFilters} />
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
