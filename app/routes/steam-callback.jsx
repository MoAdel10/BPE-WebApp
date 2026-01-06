import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function SteamCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Grab the token from the URL: ?token=...
    const token = searchParams.get("token");

    if (token) {
      // 2. Save it so the whole app can use it
      localStorage.setItem("userToken", token);
      
      // 3. Go home. We use window.location to force a full 
      // refresh so the Navbar "wakes up" and sees the token.
      window.location.href = "/";
    } else {
      navigate("/");
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-foreground">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-heading font-bold">Completing Steam Login...</p>
    </div>
  );
}