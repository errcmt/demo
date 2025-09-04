import type { ReactNode } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden"/>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </header>
  );
}
