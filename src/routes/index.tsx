import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

// Single mount point for the legacy react-router-dom App.
// Previously both `/` and `/$` mounted <App />, which created two
// BrowserRouter instances and produced the React "setState during render"
// error from TanStack's Transitioner. Keeping only one mount fixes it.
export const Route = createFileRoute("/")({
  component: AppHost,
  ssr: false,
});

function AppHost() {
  const [App, setApp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("@/App").then((mod) => {
      if (!cancelled) setApp(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!App) return null;
  return <App />;
}
