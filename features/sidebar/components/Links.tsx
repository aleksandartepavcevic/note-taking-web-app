import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
} from '@/components/ui/sidebar';
import React from 'react';
import NavLink from './NavLink';
import { IconOptions } from '../types/navlink.types';

const Links = () => {
    const items = [
        {
            url: '/notes',
            icon: 'house',
            label: 'All Notes',
        },
        {
            url: '/notes/archived',
            icon: 'archived',
            label: 'Archived Notes',
        },
    ] satisfies {
        url: string;
        icon: IconOptions;
        label: string;
    }[];

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <NavLink
                            key={item.url}
                            href={item.url}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default Links;
