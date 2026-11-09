import { z } from "zod";
import { quoteServices } from "./content";

/** Shared between the client form (instant feedback) and the API route (authoritative validation). */

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

const str = (max = 120) => z.string({ error: "This field is required." }).trim().max(max, `Please keep this under ${max} characters.`);
const opt = <T extends readonly [string, ...string[]]>(vals: T) => z.enum(vals).optional().or(z.literal("").transform(() => undefined));
const thisYear = new Date().getFullYear();

export const stepSchemas = {
  services: z.object({
    services: z.array(z.enum(serviceIds)).min(1, "Choose at least one option.").max(10),
  }),
  vehicle: z.object({
    year: z.string({ error: "Enter a 4-digit year." }).trim().regex(/^\d{4}$/, "Enter a 4-digit year.").refine((y) => +y >= 1940 && +y <= thisYear + 2, "Enter a valid model year."),
    make: str(40).min(2, "Enter the vehicle make."),
    model: str(60).min(1, "Enter the vehicle model."),
    wheelDiameter: str(10).regex(/^$|^\d{2}(\.\d)?"?$/, 'Use inches, e.g. 18 or 18".').optional(),
    wheelCount: opt(options.wheelCount as unknown as [string, ...string[]]),
  }),
  details: z.object({
    damageTypes: z.array(z.enum(options.damageTypes)).max(7).optional(),
    damageWhen: opt(options.damageWhen as unknown as [string, ...string[]]),
    losingAir: opt(options.yesNo as unknown as [string, ...string[]]),
    vibrates: opt(options.yesNo as unknown as [string, ...string[]]),
    finishType: opt(options.finishType as unknown as [string, ...string[]]),
    color: str(80).optional(),
    condition: opt(options.condition as unknown as [string, ...string[]]),
    tireSize: str(30).regex(/^[A-Za-z0-9 ./\-]*$/, "Use the size from your sidewall, e.g. 245/40R18.").optional(),
    preferredBrand: str(40).optional(),
    tireCategory: opt(options.tireCategory as unknown as [string, ...string[]]),
    tireCount: opt(options.tireCount as unknown as [string, ...string[]]),
    installation: opt(options.installation as unknown as [string, ...string[]]),
    wheelStyle: str(300).optional(),
    vibrationSpeed: opt(options.vibrationSpeed as unknown as [string, ...string[]]),
  }),
  contact: z.object({
    name: str(80).min(2, "Please enter your name."),
    phone: z.string({ error: "Enter a 10-digit phone number." }).trim().refine((p) => p.replace(/\D/g, "").length >= 10 && p.replace(/\D/g, "").length <= 11, "Enter a 10-digit phone number."),
    email: z.string({ error: "Enter a valid email address." }).trim().max(120).email("Enter a valid email address."),
    contactMethod: z.enum(options.contactMethod as unknown as [string, ...string[]], { message: "Choose how we should reach you." }),
    notes: str(2000).optional(),
    consent: z.literal(true, { message: "Please confirm so we can contact you." }),
  }),
};

export const quoteSchema = z.object({
  ...stepSchemas.services.shape,
  ...stepSchemas.vehicle.shape,
  ...stepSchemas.details.shape,
  ...stepSchemas.contact.shape,
});
export type QuoteData = z.infer<typeof quoteSchema>;

export const UPLOAD = {
  maxFiles: 6,
  maxFileBytes: 1_500_000, // after client-side compression
  maxTotalBytes: 4_000_000, // stays under Vercel's 4.5 MB request limit
  types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
};
