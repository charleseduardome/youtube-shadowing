import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  message?: string;
  className?: string;
};

export function Input({
  id,
  label,
  message,
  className,
}: InputProps) {
  return (
    <div className={className}>
      {label && <p className={`${className}__label`}>{label}</p>}
      <input className={`${className}__input`} id={id} />
      {message && <p className={`${className}__message`}>{message}</p>}
    </div>
  );
}
