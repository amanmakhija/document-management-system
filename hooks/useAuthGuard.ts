import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const useAuthGuard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authed = await isAuthenticated();
      if (!authed) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return loading;
};
