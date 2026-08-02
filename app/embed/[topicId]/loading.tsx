import { RouteLoadingState } from "@/components/RouteLoadingState";

export default function EmbedLoading() {
  return (
    <main id="main-content">
      <RouteLoadingState label="Loading argument preview" compact />
    </main>
  );
}
