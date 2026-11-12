import { ButtonLink } from '@/shared/ui/button-link';
import { PageShell } from '@/shared/ui/page-shell';

export default function Home() {
  return (
    <PageShell
      title="LinkShelf"
      subtitle="Save learning links in collections with tags."
    >
      <div className="stack">
        <ButtonLink href="/login">Log in</ButtonLink>
        <ButtonLink href="/register" variant="secondary">
          Create account
        </ButtonLink>
        <ButtonLink href="/me" variant="secondary">
          My profile
        </ButtonLink>
        <ButtonLink href="/collections" variant="secondary">
          Collections
        </ButtonLink>
      </div>
    </PageShell>
  );
}
