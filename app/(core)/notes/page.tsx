import { auth } from '@/lib/next-auth';
import React from 'react';

const NotesPage = async () => {
    const session = await auth();
    console.log('sessions', session);
    return <div>NotesPage</div>;
};

export default NotesPage;
