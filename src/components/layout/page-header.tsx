import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  title: string;
  description: string;
  badge?: string;
};

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <header className="mb-5 flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {badge ? <Badge variant="secondary">{badge}</Badge> : null}
      </div>
      <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
    </header>
  );
}
