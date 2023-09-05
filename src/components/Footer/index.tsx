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
        &nbsp;<a target="_blank" href="https://www.linkedin.com/in/charleseduardome/">Linkedin</a> | 
        &nbsp;<a target="_blank" href="https://github.com/charleseduardome">Github</a></p>
    </div>
  );
}
