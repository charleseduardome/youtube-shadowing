import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Steps = dynamic(() => import("intro.js-react").then((mod) => mod.Steps), {
  ssr: false,
});

export function Onboarding() {
  const [stepEnabled, setStepEnabled] = useState(true);
  const [onboardingEnabled, setOnboardingEnabled] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const doneTour = localStorage.getItem("onboardingEnabled") === "yeah!";
      if (doneTour) setOnboardingEnabled(false);
    }
  }, []);

  if (!onboardingEnabled) null;

  const onExit = () => {
    setStepEnabled(false);
  };

  const onComplete = () => {
    localStorage.setItem("onboardingEnabled", "yeah!");
  };

  const steps = [
    {
      title: "Improve your English!!",
      intro:
        "Shadowing in English is repeating a native speaker's words in real-time, focusing on mimicking pronunciation, intonation, and rhythm. It enhances language fluency and listening skills by synchronizing speech and comprehension.",
      tooltipClass: "tooltipCustomClass",
      tooltipPosition: "bottom-center",
    },
    {
      element: ".field-transcription",
      title: "Choose your video",
      intro: "Copy the link of your video on YouTube and paste the URL here.",
      tooltipClass: "tooltipCustomClass",
      tooltipPosition: "bottom-center",
    },
    {
      element: ".btn-transcription",
      intro: "You can either click the OK button or press ENTER.",
      tooltipClass: "tooltipCustomClass",
      tooltipPosition: "bottom-center",
    },
  ];

  const options = {
    exitOnOverlayClick: true,
    exitOnEsc: true,
    nextLabel: "Next",
    prevLabel: "Prev",
    hidePrev: true,
    doneLabel: "Let's go!",
    overlayOpacity: 0.8,
    overlayColor: "#000",
    keyboardNavigation: true,
    scrollToElement: true,
    helperElementPadding: 0,
    showButtons: true,
  };

  return (
    onboardingEnabled && (
      <Steps
        enabled={stepEnabled || true}
        steps={steps}
        initialStep={0}
        onExit={onExit}
        onComplete={onComplete}
        options={options}
      />
    )
  );
}
