import {z} from "zod";
import {UserSchema} from "../AuthService/schemas.ts";


export const ParticipationRequestStateEnum = z.enum(['pending', 'accepted', 'rejected']);

export type ParticipationRequestState = z.infer<typeof ParticipationRequestStateEnum>;


export const ParticipationRequestSchema = z.object({
    id: z.number(),
    title: z.string(),
    authors: z.string(),
    text: z.string(),
    state: ParticipationRequestStateEnum,
    user: UserSchema,
    media: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
})

export type ParticipationRequestDto = z.infer<typeof ParticipationRequestSchema>;

export const CreateParticipationRequestSchema = z.object({
    title: z.string(),
    authors: z.string(),
    text: z.string(),
    media: z.instanceof(File),
})

export type PatchParticipantRequestDto = Pick<ParticipationRequestDto, 'state'>;

export type CreateParticipationRequestDto = z.infer<typeof CreateParticipationRequestSchema>;

export type ParticipationRequestFilters = {
    user?: number,
    state?: ParticipationRequestState,
}