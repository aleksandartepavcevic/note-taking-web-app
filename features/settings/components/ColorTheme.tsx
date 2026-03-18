'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { SunMoon, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ColorTheme = () => {
    const { theme, setTheme } = useTheme();

    const options = [
        {
            id: 'light',
            icon: Sun,
            value: 'light',
            title: 'Light Mode',
            description: 'Pick a clean and classic light theme',
        },
        {
            id: 'dark',
            icon: Moon,
            value: 'dark',
            title: 'Dark Mode',
            description: 'Select a sleek and modern dark theme',
        },
        {
            id: 'system',
            icon: SunMoon,
            value: 'system',
            title: 'System',
            description: `Adapts to your device's theme`,
        },
    ];

    return (
        <div>
            <Typography variant="h4">Color Theme</Typography>
            <Typography variant="p1" className="text-muted-foreground">
                Choose your color theme:
            </Typography>
            <RadioGroup
                className="mt-6"
                value={theme || ''}
                onValueChange={setTheme}>
                {options.map((option) => (
                    <Label
                        key={option.id}
                        htmlFor={option.id}
                        className="max-w-[500px] w-full justify-between border-1 p-4 rounded-xl has-data-[state=checked]:bg-accent/50 hover:bg-accent/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-2 border-1 rounded-lg bg-background">
                                <option.icon className="size-5!" />
                            </div>
                            <div>
                                <Typography variant="h6">
                                    {option.title}
                                </Typography>
                                <Typography
                                    variant="p2"
                                    className="text-muted-foreground">
                                    {option.description}
                                </Typography>
                            </div>
                        </div>
                        <RadioGroupItem value={option.value} id={option.id} />
                    </Label>
                ))}
            </RadioGroup>
        </div>
    );
};

export default ColorTheme;
