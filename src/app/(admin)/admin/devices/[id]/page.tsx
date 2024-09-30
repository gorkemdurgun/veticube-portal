"use client";

import { useState } from "react";

const DeviceIdPage = () => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <h1>DeviceIdPage</h1>

      <p>{message}</p>
    </div>
  );
};

export default DeviceIdPage;
