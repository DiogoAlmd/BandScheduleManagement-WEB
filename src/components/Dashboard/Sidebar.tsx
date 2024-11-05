"use client";

import { useDashboard } from "@/context/DashboardContext";
import AdminSidebar from "@/components/admin/SideBar";
import MusicianSidebar from "@/components/musician/SideBar";

const Sidebar = () => {
  const { isAdmin, isMusician } = useDashboard();

  if (isAdmin) return <AdminSidebar />;
  if (isMusician) return <MusicianSidebar />;
  return null;
};

export default Sidebar;
