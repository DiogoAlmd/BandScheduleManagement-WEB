import AdminProfile from "@/pages/Admin/AdminProfile";
import { UsersProvider } from "@/providers/UserProvider";

export default function AdminProfilePage() {
  return (
    <UsersProvider>
      <AdminProfile />
    </UsersProvider>
  );
}
