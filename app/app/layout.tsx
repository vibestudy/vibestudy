import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-6">
        <Link href="/app" className="text-lg font-bold text-primary">
          오마카쌤
        </Link>
        <UserButton />
      </header>
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
