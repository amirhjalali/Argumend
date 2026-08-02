import { RouteNotFound } from "@/components/RouteNotFound";

export default function IsClaimNotFound() {
  return (
    <RouteNotFound
      eyebrow="Claim unavailable"
      title="We could not find this claim"
      description="This claim may not have been checked yet, or the link may be incomplete. Browse the available claim checks to continue."
      primaryHref="/is"
      primaryLabel="Browse Claim Checks"
    />
  );
}
