import { Badge } from "@/components/ui/badge";
import { HintPopover } from "@/components/layout/hint-popover";

type PageHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
};

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <header className="mb-4 flex shrink-0 flex-wrap items-center gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {badge ? <Badge variant="secondary">{badge}</Badge> : null}
      {description ? <HintPopover>{description}</HintPopover> : null}
    </header>
  );
}
