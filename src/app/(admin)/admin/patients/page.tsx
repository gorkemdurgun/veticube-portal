import { svg } from "@/assets";
import Image from "next/image";

const PatientsPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center justify-between gap-2 px-2 py-4 rounded-md bg-white shadow-basic">
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-lg font-semibold">Active Patients</h4>
            <span className="text-sm text-gray-500">
              You have registered
              <span className="font-semibold"> 20 </span>
              active patients
            </span>
          </div>
          <Image src={svg.PetReview} width={50} height={50} alt="Active Patients" />
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
