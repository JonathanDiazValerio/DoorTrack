import { Ruler } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-md">
          <Ruler className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-medium text-foreground" data-testid="text-app-title">
            Contractor Measurements
          </h1>
          <p className="text-sm text-muted-foreground">
            Track door & window measurements
          </p>
        </div>
      </div>
    </header>
  );
}