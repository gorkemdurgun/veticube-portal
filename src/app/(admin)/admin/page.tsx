"use client";

import ClientsList from "@/components/branches/clients-list";

const AdminPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-1 items-center gap-6 sm:gap-12">
        <ClientsList />
      </div>
    </div>
  );
};
export default AdminPage;
