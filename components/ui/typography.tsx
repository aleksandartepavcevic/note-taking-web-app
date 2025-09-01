import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    variant: {
      h1: "text-2xl font-bold",
      h2: "text-xl font-bold",
      h4: "text-md font-semibold",
      h6: "text-sm font-medium",
      p1: "text-sm",
      p2: "text-xs",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

type HeadingElementProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphElementProps = React.HTMLAttributes<HTMLParagraphElement>;
type TypographyProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof typographyVariants>;

function TypographyH1({ children, ...rest }: HeadingElementProps) {
  return <h1 {...rest}>{children}</h1>;
}

function TypographyH2({ children, ...rest }: HeadingElementProps) {
  return <h2 {...rest}>{children}</h2>;
}

function TypographyH4({ children, ...rest }: HeadingElementProps) {
  return <h4 {...rest}>{children}</h4>;
}

function TypographyH6({ children, ...rest }: HeadingElementProps) {
  return <h6 {...rest}>{children}</h6>;
}

function TypographyP(props: ParagraphElementProps) {
  return <p {...props} />;
}

export function Typography({
  variant = "h1",
  className,
  ...props
}: TypographyProps) {
  const comLit = {
    h1: TypographyH1,
    h2: TypographyH2,
    h4: TypographyH4,
    h6: TypographyH6,
    p1: TypographyP,
    p2: TypographyP,
  };

  const Comp = comLit[variant as keyof typeof comLit];

  return (
    <Comp
      {...props}
      className={cn(typographyVariants({ variant, className }))}
    />
  );
}

export default Typography;
