import { ChangePassword } from '@/features/settings';
import { auth } from '@/lib/next-auth';
import { getUserAccountFromDb } from '@/utils/db';
import { notFound } from 'next/navigation';

const ChangePasswordPage = async () => {
    const session = await auth();
    const userAccount = await getUserAccountFromDb(session?.user?.id || '');

    if (userAccount?.provider) return notFound();

    return <ChangePassword />;
};

export default ChangePasswordPage;
