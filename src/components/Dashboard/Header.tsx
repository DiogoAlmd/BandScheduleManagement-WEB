"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";

const DashboardHeader = () => {
  const router = useRouter();
  const { isAdmin, isMusician } = useDashboard();
  const {logout} = useAuth();

  const handleProfileRedirect = () => {
    if (isAdmin) {
      router.push("/dashboard/admin/profile");
    } else if (isMusician) {
      router.push("/dashboard/musician/profile");
    }
  };

  return (
    <header className="bg-gray-100 border-b px-4 py-2 flex justify-end items-center space-x-4">
      <Button variant="outline" onClick={handleProfileRedirect}>
        Profile
      </Button>
      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </header>
  );
};

export default DashboardHeader;
