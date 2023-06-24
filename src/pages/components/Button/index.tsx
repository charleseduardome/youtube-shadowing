import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  loading?: boolean;
  className?: string;
  onClick(): void;
};

export function Button({
  title,
  className,
  onClick
}: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
}
