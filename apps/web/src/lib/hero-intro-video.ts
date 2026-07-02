/** Homepage hero introductory video — set in apps/web/.env.local */

const RAW_URL =
  process.env.NEXT_PUBLIC_HERO_INTRO_VIDEO_URL?.trim() ||
  process.env.NEXT_PUBLIC_BRAND_VIDEO_URL?.trim() ||
  "";

const POSTER =
  process.env.NEXT_PUBLIC_HERO_INTRO_VIDEO_POSTER?.trim() ||
  "/brand-video-poster.jpg";

export const HERO_INTRO_VIDEO = {
  title: "See BrainStack in action",
  caption:
    "A quick intro to live classes, Scratch projects, and how we help kids learn to think like creators.",
  poster: POSTER,
} as const;

export type HeroIntroVideoSource =
  | { kind: "embed"; src: string }
  | { kind: "mp4"; src: string };

function appendQuery(url: string, params: Record<string, string>): string {
  const [base, query = ""] = url.split("?");
  const search = new URLSearchParams(query);
  for (const [key, value] of Object.entries(params)) {
    search.set(key, value);
  }
  const qs = search.toString();
  return qs ? `${base}?${qs}` : base;
}

export function resolveHeroIntroVideoSource(
  raw = RAW_URL,
): HeroIntroVideoSource | null {
  if (!raw) return null;

  const watchMatch = raw.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/,
  );
  if (watchMatch) {
    return {
      kind: "embed",
      src: `https://www.youtube.com/embed/${watchMatch[1]}?rel=0&modestbranding=1`,
    };
  }

  if (/youtube\.com\/embed\//.test(raw) || /player\.vimeo\.com\/video\//.test(raw)) {
    return {
      kind: "embed",
      src: appendQuery(raw, { rel: "0", modestbranding: "1" }),
    };
  }

  return { kind: "mp4", src: raw };
}

export function heroIntroEmbedPlayUrl(src: string): string {
  return appendQuery(src, { autoplay: "1" });
}
