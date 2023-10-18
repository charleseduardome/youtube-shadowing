import React, { InputHTMLAttributes, useRef, useEffect } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  message?: string;
  className?: string;
  dispatch?(): void;
};

export function Input({
  id,
  label,
  message,
  className,
  dispatch,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputElement = inputRef.current;

    const handleEvent = ( event: any ) => {
      if (event.key === 'Enter' && dispatch) {
        event.preventDefault();
        dispatch()
      }
    };

    if(inputElement) {
      inputElement.addEventListener( 'keydown', handleEvent );
      return () => inputElement.removeEventListener( 'keydown', handleEvent );
    }
  }, [])

  return (
    <div className={className}>
      {label && <p className={`${className}__label`}>{label}</p>}
      <input
        className={`${className}__input`} 
        id={id} ref={inputRef} 
        {...rest}
      />
      {message && <p className={`${className}__message`}>{message}</p>}
    </div>
  );
}
