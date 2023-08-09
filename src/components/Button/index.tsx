import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id: string;
  title: string;
  loading?: boolean;
  className?: string;
  onClick(): void;
};

export function Button({
  id,
  title,
  className,
  onClick
}: ButtonProps) {
  return (
    <button className={className} onClick={onClick} id={id}>
      {title}
    </button>
  );
}
