import type { ReactNode } from "react";
import { EmptyState } from "../../shared/ui/EmptyState";
import { PageHeader } from "../../shared/ui/PageHeader";

export function SectionPage({
  children,
  description,
  icon,
  title
}: {
  children?: ReactNode;
  description: string;
  icon: ReactNode;
  title: string;
}) {
  return (
    <section>
      <PageHeader title={title} subtitle={description} />
      {children}
      <EmptyState
        icon={icon}
        title={`${title} lives here`}
        description="This part of TestPilot will be built next. Navigation, look and feel, and the route itself are ready so future work can plug in cleanly."
      />
    </section>
  );
}