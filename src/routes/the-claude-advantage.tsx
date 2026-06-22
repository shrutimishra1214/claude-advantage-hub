import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/components/landing-page";

export const Route = createFileRoute("/the-claude-advantage")({
  component: LandingPage,
});
