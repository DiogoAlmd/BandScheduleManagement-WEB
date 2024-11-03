import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();

  const handleCreateScale = () => {
    // Redireciona para a página de criação de escala
    router.push("/admin/create-scale");
  };

  const handleManageMusicians = () => {
    // Redireciona para a página de gerenciamento de músicos
    router.push("/admin/manage-musicians");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Button onClick={handleCreateScale} className="w-full">
        Add New Scale
      </Button>
      <Button onClick={handleManageMusicians} className="w-full">
        Manage Musicians
      </Button>
      {/* Outros botões para funcionalidades de administração */}
    </div>
  );
}
