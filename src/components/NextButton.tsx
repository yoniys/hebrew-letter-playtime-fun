
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type NextButtonProps = {
  onClick: () => void;
};

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <Button
        onClick={onClick}
        className="bg-kid-blue hover:bg-kid-blue/90 font-bold rounded-xl py-4 sm:py-6 px-6 sm:px-8 text-white text-sm sm:text-base"
      >
        Next Question <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
};

export default NextButton;
