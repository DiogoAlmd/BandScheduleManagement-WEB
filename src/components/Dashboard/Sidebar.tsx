"use client";

import { useDashboard } from "@/context/DashboardContext";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import MusicianSidebar from "@/components/Sidebar/MusicianSidebar";

const Sidebar = () => {
  const { isAdmin, isMusician } = useDashboard();

  if (isAdmin) return <AdminSidebar />;
  if (isMusician) return <MusicianSidebar />;
  return null;
};

export default Sidebar;
