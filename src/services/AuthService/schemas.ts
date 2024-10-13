import {z} from "zod";

export const UserSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().email(),
    name: z.string().nullish(),
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    middle_name: z.string().nullish(),
    phone_number: z.string().nullish(),
    birth_date: z.coerce.date().nullish(),
    is_filled_by_user: z.boolean(),
    permissions: z.array(z.string()),
});

export type RetrieveUserDto = z.infer<typeof UserSchema>;
export type UpdateUserDto = Pick<z.infer<typeof UserSchema>, 'first_name' | 'last_name' | 'middle_name' | 'phone_number' | 'birth_date'>;

export const LoginOrRegisterSchema = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string(),
}).refine(
    (data) => (data.username !== undefined || data.email !== undefined),
    {message: 'Требуется ввести username или email'},
)
export type LoginOrRegisterDto = z.infer<typeof LoginOrRegisterSchema>;
