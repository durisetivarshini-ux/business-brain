import React from "react";
import { Button } from "../ui/Button";

export const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <Button variant="primary" size="lg">Get Started</Button>
      <Button variant="outline" size="lg">Learn More</Button>
    </div>
  );
};
