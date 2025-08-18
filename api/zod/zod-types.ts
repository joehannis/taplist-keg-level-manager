import { z } from 'zod';

export const tapSchema = z.looseObject({
  current_keg: z.looseObject({
    beverage: z.looseObject({
      name: z.string(),
      glassware_illustration_url: z.url().nullable(),
      abv_percent: z.number().min(0),
      style: z.object({ style: z.string() }).optional(),
      beverage_type: z.string().optional().nullable(),
    }),
    current_tap_number: z.number(),
    percent_full: z.number().min(0).max(100),
    remaining_volume_ml: z.number().min(0),
  }),
  label: z.string().optional(),
  logo_thumbnail_url: z.url(),
  venue: z.string(),
});

export const tapListSchema = z.array(tapSchema);

export const servedSchema = z.looseObject({
  beverage: z.looseObject({
    name: z.string(),
    glassware_illustration_url: z.url().nullable(),
    abv_percent: z.number().min(0),
    style: z.object({ style: z.string() }).optional(),
    beverage_type: z.string().optional().nullable(),
  }),
  current_tap_number: z.number(),
  percent_full: z.number().min(0).max(100),
  remaining_volume_ml: z.number().min(0),
});

export const brewfatherSchema = z.object({
  _id: z.string(),
  batchNo: z.number(),
  brewDate: z.number(),
  brewer: z.string().nullable(),
  name: z.string(),
  recipe: z.object({ name: z.string() }),
  status: z.string(),
});

export const brewfatherList = z.array(brewfatherSchema);

export const servedRequestSchema = z.object({
  currentTapNumber: z.number(),
  servedAmount: z.number(),
  flow: z.boolean().optional(),
});

export const resetRequestSchema = z.object({
  currentTapNumber: z.number(),
});
