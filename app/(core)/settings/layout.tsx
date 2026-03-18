import { Separator } from '@/components/ui/separator';
import NavLink from '@/features/sidebar/components/NavLink';
import { IconOptions } from '@/features/sidebar/types/navlink.types';
import { auth } from '@/lib/next-auth';
import { getUserAccountFromDb } from '@/utils/db';
import React from 'react';

const SettingsLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    const userAccount = await getUserAccountFromDb(session?.user?.id || '');

    const links = [
        {
            url: '/settings/color-theme',
            icon: 'sun',
            label: 'Color Theme',
        },
        {
            url: '/settings/font-theme',
            icon: 'type',
            label: 'Font Theme',
        },
    ] as {
        url: string;
        icon: IconOptions;
        label: string;
    }[];

    if (!userAccount?.provider)
        links.push({
            url: '/settings/change-password',
            icon: 'lock',
            label: 'Change Password',
        });

    return (
        <div className="flex h-full overflow-hidden">
            <div className="w-[260px] flex flex-col p-5 gap-2">
                {links.map((link) => (
                    <NavLink
                        key={link.url}
                        href={link.url}
                        icon={link.icon}
                        label={link.label}
                    />
                ))}
            </div>
            <Separator orientation="vertical" />
            <div className="flex-1 p-5">{children}</div>
        </div>
    );
};

export default SettingsLayout;
