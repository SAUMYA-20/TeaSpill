import { useEffect, useState } from "react";
import api from "../api";
import TeaCard from "../components/TeaCard";
import CreateTea from "../components/CreateTea";

export default function Home() {
  const [teas, setTeas] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchTeas = async () => {
      try {
        const res = await api.get("/tea");
        if (isMounted) setTeas(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch teas", err);
      }
    };

    fetchTeas();

    return () => {
      isMounted = false;
    };
  }, []);

  const refresh = async () => {
    try {
      const res = await api.get("/tea");
      setTeas(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Refresh failed", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">
      <CreateTea refresh={refresh} />
      <div className="space-y-4">
        {teas.map((tea) => (
          <TeaCard key={tea._id} tea={tea} refresh={refresh} />
        ))}
      </div>
    </div>
  );
}