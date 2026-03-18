'use client';

import {
    useEffect,
    useState,
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react';

type Font = 'sans' | 'serif' | 'monospace';

const FontContext = createContext<{
    font: Font;
    setFont: (font: Font) => void;
}>({
    font: 'sans',
    setFont: () => {},
});

const Provider = ({
    children,
    font,
    setFont,
}: {
    children: React.ReactNode;
    font: Font;
    setFont: Dispatch<SetStateAction<Font>>;
}) => {
    return (
        <FontContext.Provider value={{ font, setFont }}>
            {children}
        </FontContext.Provider>
    );
};

export const useFont = () => useContext(FontContext);

export function FontProvider({
    children,
    defaultFont,
}: {
    children: React.ReactNode;
    defaultFont: Font;
}) {
    const [font, setFont] = useState(defaultFont);

    useEffect(() => {
        const fontFamilyValue = `var(--font-${font})`;
        document.body.style.fontFamily = fontFamilyValue;
    }, [font, defaultFont]);

    return (
        <Provider font={font} setFont={setFont}>
            {children}
        </Provider>
    );
}
