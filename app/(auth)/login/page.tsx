import { Login } from '@/features/auth';
import { auth } from '@/lib/next-auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
    const session = await auth();

    if (session) {
        redirect('/notes');
    }

    return <Login />;
};

export default LoginPage;
