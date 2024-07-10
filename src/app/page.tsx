"use client";

import { useAppDispatch } from "@/hooks";
import Link from "next/link";

export default function Home() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Link href="/admin/appointments">Admin Appointments</Link>
    </div>
  );
}
