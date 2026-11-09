import * as z from "zod/mini";
import { quoteServices } from "./content";

/**
 * Shared between the client form (instant feedback) and the API route (authoritative validation).
 * Uses `zod/mini` to keep the /contact bundle small. `jitless` stops Zod probing `new Function`,
 * which our CSP (correctly) blocks and would otherwise report as a violation.
 */
z.config({ jitless: true });

export const serviceIds = quoteServices.map((s) => s.id) as [string, ...string[]];
const groupOf = (id: string) => quoteServices.find((s) => s.id === id)?.group;
export const needsRepair = (ids: string[]) => ids.some((i) => groupOf(i) === "repair");
export const needsFinish = (ids: string[]) => ids.some((i) => groupOf(i) === "finish");
export const needsTires = (ids: string[]) => ids.some((i) => groupOf(i) === "tires");
export const needsWheels = (ids: string[]) => ids.some((i) => groupOf(i) === "wheels");
export const needsBalance = (ids: string[]) => ids.some((i) => groupOf(i) === "balancing");

export const options = {
  wheelCount: ["1", "2", "3", "4", "5+", "Not sure"],
  damageTypes: ["Bent / wobble", "Curb rash", "Crack", "Gouges / chips", "Corrosion / slow leak", "Peeling finish", "Other"],
  damageWhen: ["Within the last week", "Within the last month", "Longer ago", "Not sure"],
  yesNo: ["Yes", "No", "Not sure"],
  finishType: ["Factory match", "Gloss", "Satin", "Matte", "Polished", "Machined / two-tone", "Chrome", "Not sure yet"],
  condition: ["Good — just want a new look", "Curb rash or scrapes", "Peeling or corroded finish", "Bent or damaged", "Not sure"],
  tireCategory: ["All-season", "Winter / snow", "Performance", "All-terrain", "Highway / touring", "Not sure"],
  tireCount: ["1", "2", "4", "Other"],
  installation: ["Mount & balance on my wheels", "Install on my vehicle", "Mount on new wheels", "Not sure"],
  vibrationSpeed: ["Under 40 mph", "40–50 mph", "50–70 mph", "Over 70 mph", "All the time"],
  contactMethod: ["Phone call", "Text message", "Email"],
} as const;

type Tuple = readonly [string, ...string[]];
const thisYear = new Date().getFullYear();
const req = "This field is required.";

/** Trimmed string with a max length (and optional min length + message). */
const str = (max = 120, min?: number, minMsg?: string) =>
  z.string(req).check(
    z.trim(),
    z.maxLength(max, `Please keep this under ${max} characters.`),
    ...(min ? [z.minLength(min, minMsg ?? req)] : []),
  );
/** Optional single choice; an empty string means "not answered". */
const choice = (vals: Tuple) => z.optional(z.union([z.enum(vals as unknown as [string, ...string[]]), z.literal("")]));
const optStr = (max: number) => z.optional(str(max));

export const stepSchemas = {
  services: z.object({
    services: z.array(z.enum(serviceIds), "Choose at least one option.").check(z.minLength(1, "Choose at least one option."), z.maxLength(10)),
  }),
  vehicle: z.object({
    year: z.string("Enter a 4-digit year.").check(
      z.trim(),
      z.regex(/^\d{4}$/, "Enter a 4-digit year."),
      z.refine((y) => +y >= 1940 && +y <= thisYear + 2, "Enter a valid model year."),
    ),
    make: str(40, 2, "Enter the vehicle make."),
    model: str(60, 1, "Enter the vehicle model."),
    wheelDiameter: z.optional(str(10).check(z.regex(/^$|^\d{2}(\.\d)?"?$/, 'Use inches, e.g. 18 or 18".'))),
    wheelCount: choice(options.wheelCount),
  }),
  details: z.object({
    damageTypes: z.optional(z.array(z.enum(options.damageTypes)).check(z.maxLength(7))),
    damageWhen: choice(options.damageWhen),
    losingAir: choice(options.yesNo),
    vibrates: choice(options.yesNo),
    finishType: choice(options.finishType),
    color: optStr(80),
    condition: choice(options.condition),
    tireSize: z.optional(str(30).check(z.regex(/^[A-Za-z0-9 ./-]*$/, "Use the size from your sidewall, e.g. 245/40R18."))),
    preferredBrand: optStr(40),
    tireCategory: choice(options.tireCategory),
    tireCount: choice(options.tireCount),
    installation: choice(options.installation),
    wheelStyle: optStr(300),
    vibrationSpeed: choice(options.vibrationSpeed),
  }),
  contact: z.object({
    name: str(80, 2, "Please enter your name."),
    phone: z.string("Enter a 10-digit phone number.").check(
      z.trim(),
      z.maxLength(30, "Enter a 10-digit phone number."),
      z.refine((p) => { const d = p.replace(/\D/g, "").length; return d >= 10 && d <= 11; }, "Enter a 10-digit phone number."),
    ),
    email: z.string("Enter a valid email address.").check(
      z.trim(),
      z.maxLength(120, "Enter a valid email address."),
      z.regex(/^[^\s@<>"]+@[^\s@<>"]+\.[A-Za-z]{2,}$/, "Enter a valid email address."),
    ),
    contactMethod: z.enum(options.contactMethod, "Choose how we should reach you."),
    notes: optStr(2000),
    consent: z.literal(true, "Please confirm so we can contact you."),
  }),
};

export const stepKeys = (step: keyof typeof stepSchemas) => Object.keys(stepSchemas[step].def.shape);

export const quoteSchema = z.object({
  ...stepSchemas.services.def.shape,
  ...stepSchemas.vehicle.def.shape,
  ...stepSchemas.details.def.shape,
  ...stepSchemas.contact.def.shape,
});
export type QuoteData = z.infer<typeof quoteSchema>;

export const UPLOAD = {
  maxFiles: 6,
  maxFileBytes: 1_500_000, // after client-side compression
  maxTotalBytes: 4_000_000, // stays under Vercel's 4.5 MB request limit
};
