import { createFileRoute, Navigate } from "@tanstack/react-router";

// All non-root URLs are handled by react-router-dom inside <App />, which is
// mounted at "/". Redirect any direct hit on a deep URL to "/" so the single
// BrowserRouter instance can take over and route to the real page.
export const Route = createFileRoute("/$")({
  component: SplatRedirect,
  ssr: false,
});

function SplatRedirect() {
  // Preserve the requested path so BrowserRouter renders the right page.
  if (typeof window !== "undefined") {
    const target = window.location.pathname + window.location.search + window.location.hash;
    if (target && target !== "/") {
      // Use replaceState so the back button still works naturally.
      window.history.replaceState({}, "", target);
    }
  }
  return <Navigate to="/" replace />;
}
