import { SidebarLogo } from '@/components/logo';
import React from 'react';
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

const Sidebar = () => {
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
            <SidebarFooter>
                <Account />
            </SidebarFooter>
        </SidebarUI>
    );
};

export default Sidebar;
