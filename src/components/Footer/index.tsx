import React from 'react';

type InputProps = {
  className?: string;
};

export function Footer({
  className,
}: InputProps) {
  return (
    <div className={className}>
      <p>
        Developed by <span className="footer__name">Charles Santos</span> | 
        &nbsp;<a target="_blank" href="https://www.linkedin.com/in/charleseduardome/">LinkedIn</a> | 
        &nbsp;<a target="_blank" href="https://github.com/charleseduardome">GitHub</a></p>
    </div>
  );
}
