import type { ButtonHTMLAttributes } from 'react';

type Variant = 'dark' | 'outline' | 'red';
type Size = 'sm' | 'md' | 'square';

const VARIANTS: Record<Variant, string> = {
  dark: 'bg-ink text-white hover:bg-black border border-ink',
  outline: 'bg-surface text-ink border border-ink hover:bg-canvas',
  red: 'bg-ao3 text-white border border-ao3 hover:bg-ao3dark',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-10 px-4 text-[13px]',
  square: 'h-[38px] w-[38px] text-base',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'outline', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md font-semibold transition-colors disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    />
  );
}
