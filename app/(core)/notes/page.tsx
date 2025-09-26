import { auth } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const NotesPage = async () => {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return <div className="h-full">All notes</div>;
};

export default NotesPage;
