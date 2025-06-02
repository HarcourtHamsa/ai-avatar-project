"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { useAddDefaultAvatars } from "../hooks/use-seed";

const Page = () => {
  const {
    mutate: generateDatabase,
    isPending,
    data,
    error,
    isError,
  } = useAddDefaultAvatars();

  return <DashboardLayout></DashboardLayout>;
};

export default Page;
