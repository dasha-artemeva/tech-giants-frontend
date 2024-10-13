import { z } from 'zod'


export const ConferenceSchema = z.object({
    short_name: z.string(),
    name: z.string(),
    start_date: z.coerce.date(),
    duration: z.string(),
    format: z.string(),
    grade: z.string(),
})

export type ConferenceDto = z.infer<typeof ConferenceSchema>;
