"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight, Camera, Check, CheckCircle2, Loader2, Phone, X, AlertTriangle } from "lucide-react";
import { quoteServices } from "@/lib/content";
import { needsBalance, needsFinish, needsRepair, needsTires, needsWheels, options, stepKeys, stepSchemas, UPLOAD } from "@/lib/quote";
import { site } from "@/lib/site";

type Data = Record<string, string | string[] | boolean | undefined>;
type Errors = Record<string, string>;
type Photo = { id: string; file: File; url: string };

const STEPS = [
  { key: "services", label: "Service" },
  { key: "vehicle", label: "Vehicle" },
  { key: "details", label: "Details" },
  { key: "contact", label: "Contact" },
] as const;

const TURNSTILE = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Downscale + re-encode photos in the browser so uploads are fast on mobile and fit server limits.
 * Re-encoding drops EXIF (incl. GPS). Returns null if the browser can't decode the file — we never
 * upload an unprocessed original (the server also strips metadata as a second layer).
 */
async function compress(file: File): Promise<File | null> {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * scale);
    c.height = Math.round(bmp.height * scale);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/jpeg", 0.82));
    if (!blob) return null;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return null; // e.g. HEIC on browsers that can't decode it
  }
}

export function QuoteForm() {
  const params = useSearchParams();
  const preset = params.get("service");
  const brand = params.get("brand");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Data>(() => ({
    services: preset && quoteServices.some((s) => s.id === preset) ? [preset] : [],
    preferredBrand: brand ?? "",
    year: "", make: "", model: "", name: "", phone: "", email: "",
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoMsg, setPhotoMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "dev" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const formToken = useRef<string | null>(null);
  const [enabled, setEnabled] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  // Signed, timestamped token from the server (replaces a client-side start time that bots could fake).
  const loadToken = async () => {
    try {
      const r = await fetch("/api/quote/token", { cache: "no-store" });
      const j = (await r.json()) as { token: string | null; enabled: boolean };
      formToken.current = j.token;
      setEnabled(j.enabled !== false);
    } catch { formToken.current = null; }
  };
  useEffect(() => { loadToken(); }, []);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const services = useMemo(() => (data.services as string[]) ?? [], [data.services]);
  const show = useMemo(() => ({ repair: needsRepair(services), finish: needsFinish(services), tires: needsTires(services), wheels: needsWheels(services), balance: needsBalance(services) }), [services]);

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k: string, v: Data[string]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
  };
  const toggle = (k: string, v: string) => {
    const cur = (data[k] as string[]) ?? [];
    set(k, cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);
  };

  const validate = (i: number) => {
    const schema = stepSchemas[STEPS[i].key];
    const r = schema.safeParse(data);
    if (r.success) { setErrors({}); return true; }
    const e: Errors = {};
    for (const iss of r.error.issues) { const k = String(iss.path[0]); if (!e[k]) e[k] = iss.message; }
    setErrors(e);
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
    return false;
  };

  const goto = (i: number) => {
    setDir(i > step ? 1 : -1);
    setStep(i);
    requestAnimationFrame(() => { headingRef.current?.focus(); formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); });
  };
  const next = () => validate(step) && goto(step + 1);

  const addPhotos = async (list: FileList | null) => {
    if (!list) return;
    setPhotoMsg("");
    const room = UPLOAD.maxFiles - photos.length;
    const picked = Array.from(list).slice(0, room);
    if (list.length > room) setPhotoMsg(`You can attach up to ${UPLOAD.maxFiles} photos.`);
    const out: Photo[] = [];
    for (const f of picked) {
      if (!f.type.startsWith("image/") && !/\.(heic|heif)$/i.test(f.name)) { setPhotoMsg("Only image files can be attached."); continue; }
      const c = await compress(f);
      if (!c) { setPhotoMsg(`"${f.name}" couldn't be read by your browser. Please choose a JPG or PNG, or take a screenshot of it.`); continue; }
      if (c.size > UPLOAD.maxFileBytes) { setPhotoMsg(`"${f.name}" is too large. Try a smaller photo or a screenshot.`); continue; }
      out.push({ id: crypto.randomUUID(), file: c, url: URL.createObjectURL(c) });
    }
    setPhotos((p) => {
      const all = [...p, ...out];
      const total = all.reduce((n, x) => n + x.file.size, 0);
      if (total > UPLOAD.maxTotalBytes) { setPhotoMsg("Those photos are too large together — please remove one."); return p; }
      return all;
    });
  };
  const removePhoto = (id: string) => setPhotos((p) => { const x = p.find((y) => y.id === id); if (x) URL.revokeObjectURL(x.url); return p.filter((y) => y.id !== id); });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) return next();
    if (!validate(step)) return;
    setStatus("sending");
    setServerMsg("");
    const fd = new FormData();
    fd.set("data", JSON.stringify(data));
    if (!formToken.current) await loadToken();
    fd.set("form_token", formToken.current ?? "");
    fd.set("company_website", (formRef.current?.elements.namedItem("company_website") as HTMLInputElement)?.value ?? "");
    const ts = formRef.current?.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value;
    if (ts) fd.set("cf-turnstile-response", ts);
    photos.forEach((p) => fd.append("photos", p.file, p.file.name));
    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) {
        setStatus(j.delivered ? "done" : "dev");
        if (typeof window !== "undefined" && "gtag" in window) (window as unknown as { gtag: (...a: unknown[]) => void }).gtag("event", "generate_lead", { form: "quote" });
        requestAnimationFrame(() => headingRef.current?.focus());
        return;
      }
      if (j.issues) {
        const e2: Errors = {};
        for (const i of j.issues as { path: string; message: string }[]) e2[i.path.split(".")[0]] = i.message;
        setErrors(e2);
        const first = STEPS.findIndex((s) => stepKeys(s.key).some((k) => e2[k]));
        if (first >= 0) setStep(first);
      }
      if (j.error === "expired") await loadToken();
      setServerMsg(j.message || `Something went wrong. Please call ${site.phone}.`);
      setStatus("error");
    } catch {
      setServerMsg(`We couldn't reach the server. Please check your connection or call ${site.phone}.`);
      setStatus("error");
    }
  };

  if (status === "done" || status === "dev") {
    return (
      <div className="panel p-8 text-center sm:p-14" role="status">
        <CheckCircle2 className="mx-auto size-16 text-signal" aria-hidden />
        <h2 ref={headingRef} tabIndex={-1} className="display mt-6 text-4xl outline-none sm:text-5xl">{status === "done" ? "Request received." : "Test submission OK."}</h2>
        <p className="mx-auto mt-4 max-w-md text-silver/85">
          {status === "done"
            ? `Thanks, ${String(data.name).split(" ")[0]}. Your request was sent to the Wheel Werks team and we'll reach out by ${String(data.contactMethod).toLowerCase()} during business hours.`
            : "Development mode: the request validated and was logged on the server, but NOT delivered because email isn't configured."}
        </p>
        <a href={site.phoneHref} className="btn-ghost mt-8"><Phone className="size-4" aria-hidden /> Need it sooner? {site.phone}</a>
      </div>
    );
  }

  const err = (k: string) => errors[k] ? <p id={`${k}-err`} className="mt-2 flex items-center gap-1.5 text-sm text-alert"><AlertTriangle className="size-3.5" aria-hidden />{errors[k]}</p> : null;
  const aria = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  const Text = ({ k, label, placeholder, type = "text", auto, mode, optional }: { k: string; label: string; placeholder?: string; type?: string; auto?: string; mode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; optional?: boolean }) => (
    <div>
      <label htmlFor={k} className="label">{label}{optional && <span className="ml-1 text-mute">(optional)</span>}</label>
      <input id={k} name={k} type={type} autoComplete={auto} inputMode={mode} placeholder={placeholder} value={(data[k] as string) ?? ""} onChange={(e) => set(k, e.target.value)} className="field" {...aria(k)} />
      {err(k)}
    </div>
  );

  const Chips = ({ k, label, opts, multi, optional }: { k: string; label: string; opts: readonly string[]; multi?: boolean; optional?: boolean }) => (
    <fieldset {...aria(k)} tabIndex={errors[k] ? -1 : undefined}>
      <legend className="label">{label}{optional && <span className="ml-1 text-mute">(optional)</span>}</legend>
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => {
          const on = multi ? ((data[k] as string[]) ?? []).includes(o) : data[k] === o;
          return (
            <label key={o} className={`relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal-hi ${on ? "border-signal bg-signal/15 text-chrome" : "border-edge bg-carbon text-silver hover:border-white/30"}`}>
              <input type={multi ? "checkbox" : "radio"} name={k} value={o} checked={on} onChange={() => (multi ? toggle(k, o) : set(k, on ? "" : o))} className="sr-only" />
              {on && <Check className="-ml-1 mr-1.5 size-3.5 text-signal" aria-hidden />}{o}
            </label>
          );
        })}
      </div>
      {err(k)}
    </fieldset>
  );

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="panel scroll-mt-24 overflow-hidden" aria-labelledby="quote-step-title">
      {TURNSTILE && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}

      {!enabled && (
        <div role="note" className="flex items-start gap-3 border-b border-signal/30 bg-signal/10 p-5 text-sm text-chrome sm:px-8">
          <Phone className="mt-0.5 size-4 shrink-0 text-signal-hi" aria-hidden />
          <p>Online quote requests are coming soon. For now, please call <a href={site.phoneHref} className="font-semibold underline underline-offset-2">{site.phone}</a> — you can still fill this out to plan what to ask.</p>
        </div>
      )}

      {/* Progress */}
      <div className="border-b border-white/[0.07] p-5 sm:p-8">
        <ol className="flex items-center gap-2" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s.key} className="flex flex-1 flex-col gap-2">
              <span className={`h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-signal" : "bg-white/10"}`} />
              <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${i === step ? "text-chrome" : "text-mute"}`} aria-current={i === step ? "step" : undefined}>
                <span className="sr-only">Step {i + 1} of {STEPS.length}: </span>{s.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Company website<input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="relative p-5 sm:p-8">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <m.div key={step} custom={dir} initial={{ opacity: 0, x: dir * 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -30 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="grid gap-6">
            {step === 0 && (
              <>
                <Heading r={headingRef} n={1} title="What do you need help with?" sub="Choose everything that applies." />
                <fieldset {...aria("services")} tabIndex={errors.services ? -1 : undefined}>
                  <legend className="sr-only">Services</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {quoteServices.map((s) => {
                      const on = services.includes(s.id);
                      return (
                        <label key={s.id} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal-hi ${on ? "border-signal bg-signal/10 text-chrome" : "border-edge bg-carbon text-silver hover:border-white/30"}`}>
                          <input type="checkbox" name="services" value={s.id} checked={on} onChange={() => toggle("services", s.id)} className="sr-only" />
                          <span className={`grid size-5 shrink-0 place-items-center rounded-md border ${on ? "border-signal bg-signal" : "border-white/25"}`}>{on && <Check className="size-3.5 text-ink" aria-hidden />}</span>
                          <span className="font-medium">{s.label}</span>
                        </label>
                      );
                    })}
                  </div>
                  {err("services")}
                </fieldset>
              </>
            )}

            {step === 1 && (
              <>
                <Heading r={headingRef} n={2} title="Tell us about your vehicle" />
                <div className="grid gap-5 sm:grid-cols-3">
                  {Text({ k: "year", label: "Year", placeholder: "2021", mode: "numeric" })}
                  {Text({ k: "make", label: "Make", placeholder: "Toyota" })}
                  {Text({ k: "model", label: "Model", placeholder: "Tacoma" })}
                </div>
                <div className="grid gap-5 sm:grid-cols-[1fr_2fr]">
                  {Text({ k: "wheelDiameter", label: "Wheel diameter", placeholder: '18"', optional: true })}
                  {Chips({ k: "wheelCount", label: "Wheels needing service", opts: options.wheelCount, optional: true })}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <Heading r={headingRef} n={3} title="A few details" sub="Everything here is optional — answer what you can." />
                {show.repair && (
                  <Group title="Repair">
                    {Chips({ k: "damageTypes", label: "Type of damage", opts: options.damageTypes, multi: true })}
                    {Chips({ k: "damageWhen", label: "When did it happen?", opts: options.damageWhen })}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {Chips({ k: "losingAir", label: "Is the wheel losing air?", opts: options.yesNo })}
                      {Chips({ k: "vibrates", label: "Does the vehicle vibrate?", opts: options.yesNo })}
                    </div>
                  </Group>
                )}
                {show.finish && (
                  <Group title="Refinishing & powder coating">
                    {Chips({ k: "finishType", label: "Desired finish", opts: options.finishType })}
                    {Text({ k: "color", label: "Desired color", placeholder: "e.g. Satin bronze, factory silver" })}
                    {Chips({ k: "condition", label: "Current wheel condition", opts: options.condition })}
                  </Group>
                )}
                {show.tires && (
                  <Group title="Tires">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {Text({ k: "tireSize", label: "Tire size", placeholder: "245/40R18" })}
                      {Text({ k: "preferredBrand", label: "Preferred brand", placeholder: "Any / no preference" })}
                    </div>
                    {Chips({ k: "tireCategory", label: "Tire category", opts: options.tireCategory })}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {Chips({ k: "tireCount", label: "Number of tires", opts: options.tireCount })}
                      {Chips({ k: "installation", label: "Installation", opts: options.installation })}
                    </div>
                  </Group>
                )}
                {show.wheels && (
                  <Group title="Custom wheels">
                    <div>
                      <label htmlFor="wheelStyle" className="label">Style, size or brands you like</label>
                      <textarea id="wheelStyle" rows={3} value={(data.wheelStyle as string) ?? ""} onChange={(e) => set("wheelStyle", e.target.value)} className="field" placeholder="e.g. 20&quot; black multi-spoke, mild lift" {...aria("wheelStyle")} />
                      {err("wheelStyle")}
                    </div>
                  </Group>
                )}
                {show.balance && (
                  <Group title="Balancing & vibration">
                    {Chips({ k: "vibrationSpeed", label: "When do you feel the vibration?", opts: options.vibrationSpeed })}
                  </Group>
                )}

                <Group title={show.finish && !show.repair ? "Inspiration photos" : "Photos"}>
                  <p className="-mt-2 text-sm text-mute">Close-ups of damage and a shot of the whole wheel help most. Up to {UPLOAD.maxFiles} photos.</p>
                  <div className="flex flex-wrap gap-3">
                    {photos.map((p) => (
                      <div key={p.id} className="relative size-24 overflow-hidden rounded-xl border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.url} alt="Selected upload preview" className="size-full object-cover" />
                        <button type="button" onClick={() => removePhoto(p.id)} aria-label="Remove photo" className="absolute right-1 top-1 grid size-8 place-items-center rounded-full bg-black/70 text-white"><X className="size-4" /></button>
                      </div>
                    ))}
                    {photos.length < UPLOAD.maxFiles && (
                      <label className="grid size-24 cursor-pointer place-items-center rounded-xl border border-dashed border-white/25 text-center text-xs text-silver transition-colors hover:border-signal has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal-hi">
                        <span className="grid place-items-center gap-1"><Camera className="size-6 text-signal" aria-hidden />Add photos</span>
                        <input type="file" accept="image/*,.heic,.heif" multiple className="sr-only" onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }} />
                      </label>
                    )}
                  </div>
                  <p aria-live="polite" className="text-sm text-alert">{photoMsg}</p>
                </Group>
              </>
            )}

            {step === 3 && (
              <>
                <Heading r={headingRef} n={4} title="How can we reach you?" />
                <div className="grid gap-5 sm:grid-cols-2">
                  {Text({ k: "name", label: "Name", auto: "name" })}
                  {Text({ k: "phone", label: "Phone", type: "tel", auto: "tel", mode: "tel", placeholder: "(801) 555-0123" })}
                </div>
                {Text({ k: "email", label: "Email", type: "email", auto: "email", mode: "email" })}
                {Chips({ k: "contactMethod", label: "Preferred contact method", opts: options.contactMethod })}
                <div>
                  <label htmlFor="notes" className="label">Anything else? <span className="text-mute">(optional)</span></label>
                  <textarea id="notes" rows={4} value={(data.notes as string) ?? ""} onChange={(e) => set("notes", e.target.value)} className="field" {...aria("notes")} />
                  {err("notes")}
                </div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-silver">
                  <input type="checkbox" checked={data.consent === true} onChange={(e) => set("consent", e.target.checked ? true : undefined)} className="mt-1 size-5 accent-[var(--color-signal)]" {...aria("consent")} />
                  <span>Wheel Werks may contact me about this request. I&rsquo;ve read the <a href="/privacy" className="underline underline-offset-2 hover:text-white">privacy policy</a>.</span>
                </label>
                {err("consent")}
                {TURNSTILE && <div className="cf-turnstile" data-sitekey={TURNSTILE} data-theme="dark" />}
              </>
            )}
          </m.div>
        </AnimatePresence>

        <div aria-live="assertive" className="mt-6 empty:hidden">
          {status === "error" && serverMsg && (
            <p className="flex items-start gap-2 rounded-xl border border-alert/40 bg-alert/10 p-4 text-sm text-chrome"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-alert" aria-hidden />{serverMsg}</p>
          )}
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => goto(step - 1)} className="btn-ghost"><ArrowLeft className="size-4" aria-hidden /> Back</button>
          ) : <span className="text-sm text-mute">Takes about 2 minutes</span>}
          <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-70">
            {status === "sending" ? <><Loader2 className="size-4 animate-spin" aria-hidden /> Sending…</> : step < STEPS.length - 1 ? <>Continue <ArrowRight className="size-4" aria-hidden /></> : <>Send request <ArrowRight className="size-4" aria-hidden /></>}
          </button>
        </div>
      </div>
    </form>
  );
}

function Heading({ r, n, title, sub }: { r: React.RefObject<HTMLHeadingElement | null>; n: number; title: string; sub?: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal-hi">Step {n} of 4</p>
      <h2 id="quote-step-title" ref={r} tabIndex={-1} className="mt-2 font-display text-3xl font-bold uppercase outline-none sm:text-4xl">{title}</h2>
      {sub && <p className="mt-1 text-sm text-mute">{sub}</p>}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-5 rounded-xl border border-white/[0.06] bg-black/20 p-5">
      <h3 className="font-display text-xl font-semibold uppercase text-chrome">{title}</h3>
      {children}
    </section>
  );
}
