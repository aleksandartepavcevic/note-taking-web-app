import Image from 'next/image';
import React from 'react';
import Typography from './ui/typography';
import { cn } from '@/lib/utils';
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import Link from 'next/link';

const Logo = ({ className }: React.ComponentProps<'div'>) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <Image src="/logo.svg" alt="Logo" width={28} height={28} />
            <Typography className="font-pacifico font-medium" variant="h1">
                Notes
            </Typography>
        </div>
    );
};

const SidebarLogo = () => {
    return (
        <SidebarMenuItem className="group/link flex items-center">
            <SidebarMenuButton className="hover:bg-transparent w-fit" asChild>
                <Link href="/notes">
                    <Image src="/logo.svg" alt="Logo" width={20} height={20} />
                    <span className="text-xl font-pacifico font-medium whitespace-nowrap">
                        Notes
                    </span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export { SidebarLogo, Logo };
