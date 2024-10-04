import { Loader2 } from "lucide-react";

const SpinLoader = () => {
  return (
    <div className="flex h-[240px] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
};

export default SpinLoader;
