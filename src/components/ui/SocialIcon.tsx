type SocialPlatform = "facebook" | "instagram" | "youtube" | "tiktok";

type SocialIconProps = {
  platform: string;
  className?: string;
};

const PATHS: Record<SocialPlatform, string> = {
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z",
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.4.5.6.2 1.1.5 1.6 1s.8 1 1 1.6c.2.5.4 1.2.5 2.4 0 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1.1-1 1.6s-1 .8-1.6 1c-.5.2-1.2.4-2.4.5-1.2 0-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.4-.5a4.4 4.4 0 0 1-1.6-1 4.4 4.4 0 0 1-1-1.6c-.2-.5-.4-1.2-.5-2.4 0-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.9.5-2.4.2-.6.5-1.1 1-1.6s1-.8 1.6-1c.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2Zm0 5.4a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Zm0 7.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Zm5.6-7.4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
  youtube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  tiktok:
    "M19.6 6.6a4.9 4.9 0 0 1-3.5-3.4V3h-3.4v13.2a2.6 2.6 0 1 1-1.9-2.5v-3.4a6 6 0 1 0 5.3 6V9.5a8.3 8.3 0 0 0 4.8 1.5V7.6a4.9 4.9 0 0 1-1.3-1Z",
};

const isKnownPlatform = (p: string): p is SocialPlatform => p in PATHS;

export const SOCIAL_PLATFORM_LABEL: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

export function SocialIcon({
  platform,
  className = "h-5 w-5",
}: SocialIconProps) {
  if (!isKnownPlatform(platform)) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d={PATHS[platform]} />
    </svg>
  );
}
