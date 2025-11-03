import { Separator } from '@/components/ui/separator';
import Sidebar from '@/features/sidebar';
import { auth } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const CoreLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="h-screen flex flex-1 overflow-hidden">
            <Sidebar />
            <div className="w-full flex-1 h-full">
                <div className="h-18">Topbar</div>
                <Separator />
                {children}
            </div>
        </div>
    );
};

export default CoreLayout;
