"use client";

import { queries } from "@/services/db";
import { Button } from "antd";
import { useEffect, useState } from "react";

const AdminPage = () => {
  queries.deneme.getDeneme().then((res) => {
    console.log("deneme", res);
  });

  return (
    <span>
      <Button type="primary" onClick={() => null}>
        Logout
      </Button>

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
