import React from 'react';
import { SidebarLogo } from '@/components/logo';
import Tags from './components/Tags';
import {
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    Sidebar as SidebarUI,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import Links from './components/Links';
import Account from './components/Account';
import { auth } from '@/lib/next-auth';

const Sidebar = async () => {
    const session = await auth();

    const { user } = session || {};

    return (
        <SidebarUI collapsible="icon">
            <SidebarRail />
            <SidebarHeader>
                <SidebarLogo />
            </SidebarHeader>
            <SidebarContent>
                <Links />
                <Separator />
                <Tags />
            </SidebarContent>
            <Separator />
            <SidebarFooter>
                <Account user={user} />
            </SidebarFooter>
        </SidebarUI>
    );
};

export default Sidebar;
