"use client";

import { Button, DatePicker } from "antd";
import Image from "next/image";

import { FaBaby } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <DatePicker />
      <Button 
      
     type="primary"
      icon={<FaBaby />}
    >Button</Button>
    </div>
  );
}
