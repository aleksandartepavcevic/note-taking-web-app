'use server';

import { createNewUser, getUserFromDb } from '@/utils/db';
import { RegisterForm } from '../register/Register.schemas';
import { saltAndHashPassword } from '@/utils/password';
import GenericError from '@/utils/errors';
import { ErrorType } from '@/types/api/errors';
import { ApiResponse } from '@/types/api/responses';

export async function handleCredentialsSignup(values: RegisterForm) {
    try {
        const { name, email, password } = values;
        const userExists = await getUserFromDb(email);

        if (userExists) throw new GenericError(ErrorType.Generic);

        const pwHash = await saltAndHashPassword(password);
        const newUser = await createNewUser(name, email, pwHash);

        if (!newUser) throw new GenericError(ErrorType.Generic);

        return {
            status: 200,
            success: true,
            message: 'User successfully created.',
            data: newUser,
        } satisfies ApiResponse<typeof newUser>;
    } catch (error) {
        if (error instanceof Error) {
            return {
                status: 500,
                success: false,
                message: 'An unexpected error occurred.',
            } satisfies ApiResponse;
        }

        throw error;
    }
}
