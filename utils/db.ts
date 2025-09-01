import { db } from '@/lib/drizzle';
import { User, users } from '@/drizzle/schema';
import { and, eq } from 'drizzle-orm';

export const getUserFromDb = async (email: NonNullable<User['email']>) => {
    const [user] = await db
        .select()
        .from(users)
        .where(and(eq(users.email, email)))
        .limit(1);

    return user;
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
