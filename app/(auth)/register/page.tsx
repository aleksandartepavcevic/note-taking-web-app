import React from 'react';
import { Register } from '@/features/auth';
import { auth } from '@/lib/next-auth';
import { redirect } from 'next/navigation';

const RegisterPage = async () => {
    const session = await auth();

    if (session) {
        redirect('/notes');
    }
    return <Register />;
};

export default RegisterPage;
