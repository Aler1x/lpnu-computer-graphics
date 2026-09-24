import { CircleHelp } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { helpForPath } from "@/lib/help-content";

export function HelpDialog() {
  const { pathname } = useLocation();
  const topic = helpForPath(pathname);

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline" size="sm" />}
      >
        <CircleHelp data-icon="inline-start" />
        Довідка
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{topic.header}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-foreground/80">
            {topic.text}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
