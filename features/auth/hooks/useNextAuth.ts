'use client';

import { useState } from 'react';
import { ProviderId } from 'next-auth/providers';
import { loginWithCredentials, loginWithGithub } from '../actions/login';
import { LoginForm } from '../schemas/login.schemas';
import { ApiResponse } from '@/types/api/responses';
import { ErrorType } from '@/types/api/errors';

type AuthHandler<P extends ProviderId> = P extends 'credentials'
    ? (values: LoginForm) => Promise<ApiResponse>
    : () => Promise<ApiResponse | undefined>;

const useNextAuth = () => {
    const [isLoggingInWith, setIsLogginInWith] = useState<ProviderId | ''>('');

    const authProviderHandlers: Partial<
        Record<ProviderId, AuthHandler<ProviderId>>
    > = {
        credentials: loginWithCredentials,
        github: loginWithGithub,
    } as const;

    const handleLogin = async <P extends ProviderId>(
        providerId: P,
        values?: P extends 'credentials' ? LoginForm : never,
    ) => {
        try {
            const handler = authProviderHandlers[providerId];
            setIsLogginInWith(providerId);

            if (!handler) {
                console.log(`Auth provider ${providerId} not implemented`);
                return;
            }

            return await handler(
                values as P extends 'credentials' ? LoginForm : never,
            );
        } catch (error) {
            if (error instanceof Error) {
                // This is not actually an error, signIn method throws an NEXT_REDIRECT error when it's wrapped with try...catch block even tho the request was successful
                if (error.message === ErrorType.NextRedirect) {
                    return {
                        status: 200,
                        success: true,
                        message: 'Successful.',
                    };
                }

                return {
                    status: 500,
                    success: false,
                    message: 'An unexpected error occurred.',
                };
            }

            throw error;
        } finally {
            setIsLogginInWith('');
        }
    };

    return {
        handleLogin,
        isLoggingInWithCredentials: isLoggingInWith === 'credentials',
        isLoggingInWithGithub: isLoggingInWith === 'github',
    };
};

export default useNextAuth;
