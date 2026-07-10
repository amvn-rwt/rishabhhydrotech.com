import { siteConfig } from "@/lib/data/site";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background">
      <h1 className="type-display text-brand">{siteConfig.name}</h1>
    </div>
  );
}
