import { ReactNode } from 'react';
import './ui.css';

type PageShellProps = {
  title: string;
  subtitle?: string;
  wide?: boolean;
  children: ReactNode;
};

export function PageShell({ title, subtitle, wide, children }: PageShellProps) {
  return (
    <main className="page-shell">
      <section className={`page-card${wide ? ' page-card--wide' : ''}`}>
        <header className="page-header">
          <h1 className="page-title">{title}</h1>
          {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
        </header>
        {children}
      </section>
    </main>
  );
}
