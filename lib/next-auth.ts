import NextAuth from 'next-auth';
import { encode as defaultEncode } from 'next-auth/jwt';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './drizzle';
import { verifyPassword } from '@/utils/password';
import { ZodError } from 'zod';
import { loginFormSchema } from '@/features/auth';
import { getUserFromDb } from '@/utils/db';
import GenericError from '@/utils/errors';
import { v4 as uuid } from 'uuid';
import { ErrorType } from '@/types/api/errors';

const adapter = DrizzleAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } =
                        await loginFormSchema.parseAsync(credentials);

                    const user = await getUserFromDb(email);

                    if (!user) return null;

                    const isValid = await verifyPassword(
                        password,
                        String(user.password),
                    );

                    if (!isValid) return null;

                    return user;
                } catch (error) {
                    if (error instanceof ZodError) return null;

                    throw error;
                }
            },
        }),
        GitHub,
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === 'credentials') {
                token.credentials = true;
            }

            return token;
        },
    },
    jwt: {
        async encode(params) {
            if (params.token?.credentials) {
                const sessionToken = uuid();

                if (!params.token?.sub) {
                    throw new GenericError(ErrorType.Generic);
                }

                const newSession = await adapter?.createSession?.({
                    sessionToken,
                    userId: params?.token?.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                });

                if (!newSession) {
                    throw new GenericError(ErrorType.Generic);
                }

                return sessionToken;
            }

            return defaultEncode(params);
        },
    },
});
