import { AppShell } from "@/components/AppShell";
import { RouteLoadingState } from "@/components/RouteLoadingState";

export default function DashboardLoading() {
  return (
    <AppShell>
      <RouteLoadingState label="Loading your dashboard" />
    </AppShell>
  );
}
