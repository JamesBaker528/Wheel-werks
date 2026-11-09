import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="pb-24 pt-36">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="display mt-5 text-5xl sm:text-6xl">{title}</h1>
        <p className="mt-4 rounded-xl border border-signal/40 bg-signal/10 p-4 text-sm text-chrome">
          Placeholder — this page must be reviewed and approved by Wheel Werks and qualified legal counsel before launch.
        </p>
        <p className="mt-4 text-sm text-mute">Last updated: {updated}</p>
        <div className="mt-10 space-y-5 leading-relaxed text-silver/85 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:uppercase [&_li]:ml-5 [&_li]:list-disc">{children}</div>
      </div>
    </section>
  );
}
