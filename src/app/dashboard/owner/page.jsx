"use client";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import React from "react";
import { Compass, House, Calendar } from "@gravity-ui/icons";
import DashboardStats from "../DashboardStats";
const OwnerDashboardHomePage = () => {
  // const { data: session, isPending } = useSession();

  // if (isPending) {
  //   return <Spinner color="current" />;
  // }

  const ownerStats = [
    {
      title: "Total Earnings",
      value: "৳125,000",
      icon: <Compass />,
      color: "text-amber-500",
    },
    {
      title: "Total Properties",
      value: "12",
      icon: <House />,
      color: "text-cyan-500",
    },
    {
      title: "Total Bookings",
      value: "58",
      icon: <Calendar />,
      color: "text-rose-500",
    },
  ];

  // const user = session?.user;

  return (
    <div>
      <h1>Owner Dashboard</h1>
      <DashboardStats stats={ownerStats} />
    </div>
  );
};

export default OwnerDashboardHomePage;
