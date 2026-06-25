import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { AnnouncementBar } from "./AnnouncementBar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
