'use client';

import { useFont } from '@/components/font-provider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';

const FontTheme = () => {
    const { font, setFont } = useFont();

    const options = [
        {
            id: 'sans-serif',
            value: 'sans',
            title: 'Sans-serif',
            description: 'Clean and modern, easy to read.',
        },
        {
            id: 'serif',
            value: 'serif',
            title: 'Serif',
            description: 'Classic and elegant for a timeless feel.',
        },
        {
            id: 'monospace',
            value: 'monospace',
            title: 'Monospace',
            description: `Code-like, great for a technical vibe.`,
        },
    ];

    return (
        <div>
            <Typography variant="h4">Font Theme</Typography>
            <Typography variant="p1" className="text-muted-foreground">
                Choose your font theme:
            </Typography>
            <RadioGroup
                className="mt-6"
                value={font || ''}
                onValueChange={setFont}>
                {options.map((option) => (
                    <Label
                        key={option.id}
                        htmlFor={option.id}
                        className="max-w-[500px] w-full justify-between border-1 p-4 rounded-xl has-data-[state=checked]:bg-accent/50 hover:bg-accent/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-2 border-1 rounded-lg bg-background">
                                <Typography
                                    variant="h4"
                                    style={{
                                        fontFamily: `var(--font-${option.value})`,
                                    }}>
                                    Aa
                                </Typography>
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

export default FontTheme;
