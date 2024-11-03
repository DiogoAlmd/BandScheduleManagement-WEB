"use client";

import { 
  // useEffect,
  useState } from "react";
import { Button } from "@/components/ui/button";
import Musician from "@/components/admin/Musician";
// import { api } from "@/services/api";
// import { Musician } from "@/types/musician";


export default function MusiciansPage() {
  // const [musicians, setMusicians] = useState<Musician[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchMusicians() {
  //     try {
  //       const response = await api.get("/musicians");
  //       setMusicians(response.data);
  //     } catch (error) {
  //       console.error("Error fetching musicians:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchMusicians();
  // }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Musicians</h2>
        <Button onClick={() => {/* Navegação para adicionar músico */}}>
          Add Musician
        </Button>
      </div>

      {loading ? (
        <p>Loading musicians...</p>
      ) : (
        <Musician />
      )}
    </div>
  );
}
