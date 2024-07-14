"use client";

import { useSignOut } from "@nhost/nextjs";
import { Button } from "antd";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const { signOut } = useSignOut();

  return (
    <span>
      <Button type="primary" onClick={signOut}>
        Logout
      </Button>
    </span>
  );
};
export default AdminPage;
