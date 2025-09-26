'use client';

import React, { useState } from 'react';
import NavLink from './NavLink';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from '@/components/ui/sidebar';

const mockTags = [
    'cooking',
    'dev',
    'fitness',
    'health',
    'personal',
    'react',
    'recipes',
    'shopping',
    'travel',
    'typescript',
    'test123',
    'test3231',
];

const Tags = () => {
    const [scrollPosition, setScrollPosition] = useState<
        'top' | 'mid' | 'bottom'
    >('top');

    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const viewport = e.currentTarget;

        if (!viewport) return;

        const { scrollTop, scrollHeight, clientHeight } = viewport;
        const atTop = scrollTop <= 0;
        const atBottom =
            Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1;

        if (atTop) setScrollPosition('top');
        else if (atBottom) setScrollPosition('bottom');
        else setScrollPosition('mid');
    };

    const convertTagLabelToFirstLetterUpperCase = (tag: string) =>
        tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

    return (
        <SidebarGroup className="p-0 flex-1 overflow-hidden h-full">
            <SidebarGroupLabel className="ml-4 pt-4">Tags</SidebarGroupLabel>
            <ScrollArea
                onViewportScrollCapture={handleScroll}
                scrollHideDelay={0}
                className="flex-1 p-3">
                <SidebarGroupContent className="p-1 flex flex-col flex-1 overflow-hidden h-full">
                    <SidebarMenu>
                        {mockTags.map((tag) => (
                            <NavLink
                                key={tag}
                                href={`/notes?tag=${tag}`}
                                icon="tag"
                                label={convertTagLabelToFirstLetterUpperCase(
                                    tag,
                                )}
                            />
                        ))}
                    </SidebarMenu>
                    <div
                        data-pos={scrollPosition}
                        className="pointer-events-none absolute top-0 left-0 w-full h-25 transition-opacity ease-linear opacity-100 data-[pos=top]:opacity-0 bg-gradient-to-t from-transparent to-background"
                    />
                    <div
                        data-pos={scrollPosition}
                        className="pointer-events-none absolute bottom-0 left-0 w-full h-25 transition-opacity ease-linear opacity-100 data-[pos=bottom]:opacity-0 bg-gradient-to-b from-transparent to-background"
                    />
                </SidebarGroupContent>
            </ScrollArea>
        </SidebarGroup>
    );
};

export default Tags;
