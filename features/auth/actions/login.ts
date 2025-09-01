'use server';

import { signIn } from '@/lib/next-auth';
import { LoginForm } from '../login/Login.schemas';
import GenericError from '@/utils/errors';
import { ApiResponse } from '@/types/api/responses';
import { ErrorType } from '@/types/api/errors';
import { redirect } from 'next/navigation';

export async function loginWithCredentials(values: LoginForm) {
    try {
        const response = await signIn('credentials', {
            ...values,
            redirect: false,
        });

        if (!response || response?.error === ErrorType.CredentialsSignin)
            throw new GenericError(ErrorType.CredentialsSignin);

        redirect('/notes');
    } catch (error) {
        if (error instanceof Error) {
            if (error?.name === ErrorType.CredentialsSignin) {
                return {
                    status: 500,
                    success: false,
                    message: 'Invalid email or password.',
                } satisfies ApiResponse;
            }

            if (error.message === ErrorType.NextRedirect) {
                throw error;
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

export async function loginWithGithub() {
    try {
        await signIn('github', { redirectTo: '/notes' });
    } catch (error) {
        if (error instanceof Error) {
            if (error?.name === ErrorType.GithubSignin) {
                return {
                    status: 500,
                    success: false,
                    message: 'Unable to connect to the GitHub.',
                } satisfies ApiResponse;
            }

            if (error.message === ErrorType.NextRedirect) {
                throw error;
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
