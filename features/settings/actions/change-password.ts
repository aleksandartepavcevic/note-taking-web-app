'use server';

import { auth } from '@/lib/next-auth';
import GenericError from '@/utils/errors';
import { ApiResponse } from '@/types/api/responses';
import { ErrorType } from '@/types/api/errors';
import { getUserFromDb, updateUserPassword } from '@/utils/db';
import { ChangePasswordForm } from '../schemas';
import { saltAndHashPassword, verifyPassword } from '@/utils/password';
import { User } from '@/drizzle/schema';

const checkCurrentPassword = async (
    password: ChangePasswordForm['old'],
    email: NonNullable<User['email']>,
) => {
    const user = await getUserFromDb(email);
    console.log('user', user);
    if (!user || !user.password) throw new GenericError(ErrorType.Generic);

    const isValid = await verifyPassword(password, user.password);
    return isValid;
};

export default async function changePassword(values: ChangePasswordForm) {
    try {
        const session = await auth();
        if (!session || !session?.user?.email)
            throw new GenericError(ErrorType.Generic);

        console.log('session.user.email', session.user.email);

        const isValid = await checkCurrentPassword(
            values.old,
            session?.user?.email,
        );
        console.log('isValid', isValid);
        if (!isValid) throw new GenericError(ErrorType.InvalidPassword);

        const newPassword = await saltAndHashPassword(values.new);
        const user = await updateUserPassword(
            session?.user?.email,
            newPassword,
        );
        if (!user) throw new GenericError(ErrorType.Generic);

        return {
            status: 200,
            success: true,
            message: 'Password changed successfully.',
        } satisfies ApiResponse;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === ErrorType.NextRedirect) {
                throw error;
            }

            if (error.name === ErrorType.InvalidPassword) {
                return {
                    status: 500,
                    success: false,
                    message: 'Invalid old password.',
                } satisfies ApiResponse;
            }

            return {
                status: 500,
                success: false,
                message: 'An unexpected error occurred.',
            } satisfies ApiResponse;
        }

        throw error;
    }
}
