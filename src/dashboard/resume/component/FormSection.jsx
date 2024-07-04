import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnablenext] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 hover:border-primary hover:border-2 active:border-[3px] active:border-primary"
        >
          <LayoutGrid />
          Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              onClick={() => setActiveFormIndex((prevIndex) => prevIndex - 1)}
              className="flex gap-2 rounded-full"
              size="sm"
            >
              <ArrowLeft />
              Prev
            </Button>
          )}
          <Button
            //disabled={!enableNext}
            onClick={() => setActiveFormIndex((prevIndex) => prevIndex + 1)}
            className="flex gap-2 rounded-full"
            size="sm"
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/*  Forms*/}
      {activeFormIndex == 1 ? (
        <PersonalDetail enableNext={(v) => setEnablenext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summery enableNext={(v) => setEnablenext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience />
      ) : null}

      {/* Experience */}

      {/* Educational Deatils */}

      {/* Skils */}

      {/*TODO: Social/coding profile Links */}
    </div>
  );
};

export default FormSection;
