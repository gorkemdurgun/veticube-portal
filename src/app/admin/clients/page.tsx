"use client";

import { RegisterUserCard } from "@/components/clients";
import { Card, Divider, Segmented } from "antd";
import { useState } from "react";

const AdminClientsPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full grid grid-cols-[400px,1fr] gap-4">
        <RegisterUserCard />
        <Card>
          <h1>Admin Clients Page</h1>
        </Card>
      </div>
    </div>
  );
};

export default AdminClientsPage;
