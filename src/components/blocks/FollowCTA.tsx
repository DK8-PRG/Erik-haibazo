import { Section } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function FollowCTA() {
  return (
    <Section className="bg-[#F7F7F7]">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10">
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Follow</p>
        <h2 className="mt-3 text-3xl leading-tight text-[#111111] sm:text-4xl">Sleduj dalsi inspiraci</h2>
        <p className="mt-3 max-w-2xl text-sm text-neutral-700 sm:text-base">
          Kratka videa, nove recepty a zakulisi tvorby kazdy tyden.
        </p>
        <SocialLinks className="mt-6" />
      </div>
    </Section>
  );
}
