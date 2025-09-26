import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import Typography from '@/components/ui/typography';
import { auth } from '@/lib/next-auth';
import { ChevronsUpDown } from 'lucide-react';
import React from 'react';

const Account = async () => {
    const { user } = (await auth()) || {};

    const getUserInitials = (name?: string | null) => {
        if (!name) return;

        const strings = name.split(' ');
        const firstLetter = strings[0].charAt(0).toUpperCase();
        const secondLetter = strings[1].charAt(0).toUpperCase();

        return firstLetter + secondLetter;
    };

    const getUserFirstName = (name?: string | null) => {
        if (!name) return;

        const strings = name.split(' ');

        return strings[0];
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="cursor-pointer data-[state=open]:bg-sidebar-accent"
                        asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="rounded-md size-9">
                                    {user?.image && (
                                        <AvatarImage src={user.image} />
                                    )}
                                    <AvatarFallback>
                                        {getUserInitials(user?.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <Typography
                                        variant="p1"
                                        className="font-semibold">
                                        {getUserFirstName(user?.name)}
                                    </Typography>
                                    <Typography variant="p2">
                                        {user?.email}
                                    </Typography>
                                </div>
                            </div>
                            <ChevronsUpDown className="group-data-[collapsible=icon]:hidden" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="right">
                        <DropdownMenuItem>
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>Sign out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default Account;
