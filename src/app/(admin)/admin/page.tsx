"use client";

import AddNewPatient from "@/components/dashboard/AddNewPatient";

const AdminPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-[600px_1fr] items-center gap-6 sm:gap-12">
        <AddNewPatient />
      </div>
    </div>
  );
};
export default AdminPage;
