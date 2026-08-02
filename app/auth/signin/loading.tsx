import { RouteLoadingState } from "@/components/RouteLoadingState";

export default function SignInLoading() {
  return (
    <main id="main-content">
      <RouteLoadingState label="Loading sign in" />
    </main>
  );
}
