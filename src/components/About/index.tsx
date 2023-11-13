import React from "react";

type AboutProps = {
  className?: string;
};

export function About({ className }: AboutProps) {
  return (
    <div className={className}>
      <p>
        Shadowing in English is repeating a native speaker&apos;s words in
        real-time, focusing on mimicking pronunciation, intonation, and rhythm.
        It enhances language fluency and listening skills by synchronizing
        speech and comprehension.
      </p>
    </div>
  );
}
