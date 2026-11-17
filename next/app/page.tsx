import { ButtonLink } from '@/shared/ui/button-link';
import { PageShell } from '@/shared/ui/page-shell';

export default function Home() {
  return (
    <PageShell
      title="LinkShelf"
      subtitle="Сохраняй учебные ссылки в коллекциях с тегами."
    >
      <div className="stack">
        <ButtonLink href="/login">Войти</ButtonLink>
        <ButtonLink href="/register" variant="secondary">
          Создать аккаунт
        </ButtonLink>
        <ButtonLink href="/me" variant="secondary">
          Мой профиль
        </ButtonLink>
        <ButtonLink href="/collections" variant="secondary">
          Коллекции
        </ButtonLink>
      </div>
    </PageShell>
  );
}
