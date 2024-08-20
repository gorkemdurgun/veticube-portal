"use client";

import { useEffect, useState } from "react";

import { Button } from "antd";

import { queries } from "@/services/db";

const AdminPage = () => {
  return (
    <span>
      <h1>Admin Page</h1>
      {/* <div>
        {response.data?.data?.notes.map((item, index) => (
          <div key={index}>{item.note}</div>
        ))}
      </div> */}
    </span>
  );
};
export default AdminPage;
