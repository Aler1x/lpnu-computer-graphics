import { NavLink, useLocation } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { helpForPath } from "@/lib/help-content";
import { APP_ROUTES } from "@/lib/navigation";
import { CircleHelp } from "lucide-react";

export function TopNav() {
  const { pathname } = useLocation();
  const topic = helpForPath(pathname);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-card px-3 md:px-4">
      <div className="hidden items-center gap-2 sm:flex">
        <img src="/favicon.svg" alt="" className="size-8" />
        <span className="text-sm font-semibold">Комп&apos;ютерна графіка</span>
      </div>
      <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {APP_ROUTES.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }))
            }
          >
            <route.icon />
            {route.title}
          </NavLink>
        ))}
      </nav>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          <CircleHelp data-icon="inline-start" />
          Довідка
        </PopoverTrigger>
        <PopoverContent align="end" className="w-96">
          <p className="font-medium">{topic.header}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{topic.text}</p>
        </PopoverContent>
      </Popover>
    </header>
  );
}
