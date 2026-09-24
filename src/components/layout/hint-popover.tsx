import type { ReactNode } from "react";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type HintPopoverProps = {
  label?: string;
  children: ReactNode;
  align?: "start" | "center" | "end";
};

export function HintPopover({
  label = "Підказка",
  children,
  align = "start",
}: HintPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" size="icon-sm" aria-label={label} />}>
        <CircleHelp />
      </PopoverTrigger>
      <PopoverContent align={align} className="w-80 text-sm leading-relaxed">
        {children}
      </PopoverContent>
    </Popover>
  );
}
