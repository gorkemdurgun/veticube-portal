"use client";

import { useAppDispatch } from "@/utils/hooks";
import { toggleDarkMode } from "@/redux/slices/themeSlice";
import { Button, DatePicker } from "antd";
import Image from "next/image";
import { useMutation, useSubscription, gql } from "@apollo/client";
import { subscriptions } from "@/services";

import { FaBaby } from "react-icons/fa";

export default function Home() {
  const dispatch = useAppDispatch();

  return <div className="flex min-h-screen flex-col items-center p-24">Admin Page</div>;
}
