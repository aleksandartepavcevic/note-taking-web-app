'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight, LucideProps, Tag } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Archive, House } from 'lucide-react';
import { IconOptions } from '../types/navlink.types';
import { cn } from '@/lib/utils';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export default function NavLink({
    href,
    icon,
    label,
}: {
    href: string;
    icon: IconOptions;
    label: string;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const tag = searchParams.get('tag');

    const iconMap: Record<
        IconOptions,
        React.ForwardRefExoticComponent<
            Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
        >
    > = {
        house: House,
        archived: Archive,
        tag: Tag,
    };

    const Icon = iconMap[icon];

    const constructPathname = () => {
        if (!tag) return pathname;

        if (tag === label.toLowerCase()) return pathname + `?tag=${tag}`;

        return '';
    };

    const isActive = constructPathname() === href;

    return (
        <SidebarMenuItem className="group/link flex items-center">
            <SidebarMenuButton tooltip={label} asChild isActive={isActive}>
                <Link href={href}>
                    <Icon
                        className={cn(
                            'transition-colors',
                            isActive && 'text-primary font-bold',
                        )}
                    />
                    <span className="whitespace-nowrap">{label}</span>
                    <ChevronRight
                        data-active={isActive}
                        className={cn(
                            'ml-auto transition-all group-hover/link:opacity-100 group-hover/link:translate-x-[-6px] opacity-0 data-[active=true]:opacity-100 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:hidden',
                        )}
                    />
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
