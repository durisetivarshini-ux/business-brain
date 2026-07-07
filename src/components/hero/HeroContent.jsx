import React from "react";
import { HeroButtons } from "./HeroButtons";
import { HeroStats } from "./HeroStats";

export const HeroContent = () => {
  return (
    <div className="relative z-10 container mx-auto px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-6">Welcome to Business Brain</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Your intelligent operating system for business management and growth.
      </p>
      <HeroButtons />
      <HeroStats />
    </div>
  );
};
