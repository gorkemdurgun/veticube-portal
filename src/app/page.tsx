"use client";

import { useAppDispatch } from "@/hooks";
import { SignedIn, SignedOut, useAccessToken, useAuthenticated, useSignInEmailPassword, useSignOut } from "@nhost/react";
import { Button } from "antd";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Link href="/admin/appointments">Admin Appointments</Link>
    </div>
  );
}
