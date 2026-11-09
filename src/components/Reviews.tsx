import { Quote, ExternalLink, Star } from "lucide-react";
import { reviews } from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal } from "./Motion";
import { YelpIcon, FacebookIcon } from "./SocialIcons";

/** Verified reviews only (src/lib/content.ts) + links to live review platforms. No invented ratings or counts. */
export function Reviews() {
  const platforms = [
    { name: "Google", label: "Read & write Google reviews", href: site.links.googleBusiness, Icon: Star },
    { name: "Yelp", label: "See reviews on Yelp", href: site.links.yelp, Icon: YelpIcon },
    { name: "Facebook", label: "Visit us on Facebook", href: site.links.facebook, Icon: FacebookIcon },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      {reviews.map((r) => (
        <Reveal key={r.quote} className="panel relative overflow-hidden p-8 sm:p-12">
          <Quote className="absolute -right-4 -top-4 size-40 text-white/[0.03]" aria-hidden />
          <figure>
            <blockquote className="font-display text-3xl font-semibold leading-tight text-chrome sm:text-4xl">&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption className="mt-8 flex items-center gap-3 text-sm text-mute">
              <span className="h-px w-8 bg-signal" />
              {r.author} · {r.sourceUrl ? <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-white hover:underline">{r.source}</a> : r.source}
            </figcaption>
          </figure>
        </Reveal>
      ))}
      <Reveal delay={0.1} className="grid gap-4">
        {platforms.map(({ name, label, href, Icon }) => (
          <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="panel group flex items-center justify-between gap-4 p-6 transition-colors hover:border-white/20">
            <span className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-white/5 text-chrome group-hover:bg-signal group-hover:text-ink"><Icon className="size-5" aria-hidden /></span>
              <span><span className="block font-display text-xl font-semibold uppercase text-chrome">{name}</span><span className="text-sm text-mute">{label}</span></span>
            </span>
            <ExternalLink className="size-4 text-mute group-hover:text-white" aria-hidden />
          </a>
        ))}
      </Reveal>
    </div>
  );
}
