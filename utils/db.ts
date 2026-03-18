import { db } from '@/lib/drizzle';
import { accounts, User, users } from '@/drizzle/schema';
import { and, eq } from 'drizzle-orm';

export const getUserFromDb = async (email: NonNullable<User['email']>) => {
    const [user] = await db
        .select()
        .from(users)
        .where(and(eq(users.email, email)))
        .limit(1);

    return user;
};

export const getUserAccountFromDb = async (id: NonNullable<User['id']>) => {
    const [account] = await db
        .select()
        .from(accounts)
        .where(and(eq(accounts.userId, id)))
        .limit(1);

    return account;
};

export const createNewUser = async (
    name: NonNullable<User['name']>,
    email: NonNullable<User['email']>,
    pwHash: NonNullable<User['password']>,
) => {
    const [user] = await db
        .insert(users)
        .values({
            email,
            name,
            password: pwHash,
        })
        .returning();

    return user;
};

export const updateUserPassword = async (
    email: NonNullable<User['email']>,
    pwHash: NonNullable<User['password']>,
) => {
    const [user] = await db
        .update(users)
        .set({ password: pwHash })
        .where(eq(users.email, email))
        .returning();

    return user;
};
