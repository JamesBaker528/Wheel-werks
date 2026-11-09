import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center pt-24">
      <div className="container-x text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="display mt-5 text-6xl sm:text-8xl">Off the road.</h1>
        <p className="mx-auto mt-5 max-w-md text-silver/80">That page doesn&rsquo;t exist. Try one of these, or call {site.phone}.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">Home</Link>
          <Link href="/contact" className="btn-ghost">Request a Quote</Link>
        </div>
      </div>
    </section>
  );
}
