"use client";

import { useAppDispatch } from "@/hooks";
import { toggleDarkMode } from "@/redux/slices/themeSlice";
import { Button, DatePicker } from "antd";
import Image from "next/image";

import { FaBaby } from "react-icons/fa";

export default function Home() {

  const dispatch = useAppDispatch();

  
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <DatePicker />
      <Button
        type="primary"
        icon={<FaBaby />}
        onClick={() => {
          dispatch(toggleDarkMode());
        }}
      >
        Button
      </Button>
    </div>
  );
}
