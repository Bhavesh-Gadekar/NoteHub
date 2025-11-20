import { Loader } from "lucide-react";
import { useAuth } from "../context/contexProvider";

export default function LoaderGate({ children }) {
  const { isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-12 animate-spin" />
      </div>
    );
  }

  return children;
}
