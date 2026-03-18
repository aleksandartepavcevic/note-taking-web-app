import { z } from 'zod';

export const changePasswordSchema = z
    .object({
        old: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' }),
        new: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' }),
        confirm: z.string().min(1, { message: 'Confirm password is required' }),
    })
    .refine((data) => data.new === data.confirm, {
        message: 'Passwords do not match',
        path: ['confirm'],
    });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
