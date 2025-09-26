import Sidebar from '@/features/sidebar';
import React from 'react';

const CoreLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />
            {children}
        </div>
    );
};

export default CoreLayout;
