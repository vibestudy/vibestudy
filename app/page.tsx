import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col overflow-x-hidden">
      <header className="absolute left-0 right-0 top-0 z-50 flex h-16 shrink-0 items-center justify-between px-6 lg:px-12">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          오마카쌤
        </Link>
        <nav className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="lg">
                로그인
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="lg">시작하기</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/app">
              <Button size="lg">대시보드</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </nav>
      </header>

      <section className="relative flex flex-1 flex-col items-center justify-center gap-10 px-6 pt-16 text-center lg:px-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-20 top-1/4 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -left-20 bottom-1/4 size-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          AI 기반 개인 맞춤 학습
        </div>

        <div className="relative z-10 flex max-w-4xl flex-col gap-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            배우고 싶은 것만 말하세요.
            <br />
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              AI가 알아서 가르쳐드립니다.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            오마카쌤은 당신이 배우고 싶은 개발 주제를 작은 단위로 쪼개고,
            <br className="hidden sm:block" />
            직접 실습하며 AI가 채점까지 해주는 학습 플랫폼입니다.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              >
                무료로 시작하기
              </Button>
            </SignUpButton>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base transition-all duration-300"
            >
              자세히 알아보기
            </Button>
          </SignedOut>
          <SignedIn>
            <Link href="/app">
              <Button
                size="lg"
                className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              >
                학습 시작하기
              </Button>
            </Link>
          </SignedIn>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3 pt-8">
          <div className="flex -space-x-2">
            {["A", "B", "C", "D", "E"].map((letter) => (
              <div
                key={letter}
                className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-primary/80 to-emerald-400/80 text-xs font-medium text-primary-foreground"
              >
                {letter}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">1,000+</span> 명의
            개발자가 학습 중
          </p>
        </div>
      </section>

      <section className="relative px-6 py-24 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-muted/50 to-transparent" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              왜{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                오마카쌤
              </span>
              인가요?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              기존 학습 방식의 한계를 넘어, 진정한 개인 맞춤 학습을 경험하세요.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<LightbulbIcon />}
              title="AI 커리큘럼"
              description="배우고 싶은 것을 말하면 AI가 최적의 학습 순서로 커리큘럼을 생성합니다."
            />
            <FeatureCard
              icon={<LayoutIcon />}
              title="작은 단위 학습"
              description="복잡한 개념도 소화하기 쉬운 크기로 쪼개서 단계별로 학습합니다."
            />
            <FeatureCard
              icon={<CheckCircleIcon />}
              title="AI 채점"
              description="과제를 제출하면 AI가 즉시 피드백과 함께 채점해드립니다."
            />
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 lg:px-12">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-12 text-center ring-1 ring-primary/10">
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              부트캠프는 이제 그만.
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
              비싼 돈 들여 정해진 커리큘럼 따라가는 시대는 끝났습니다.
              <br />
              내가 필요한 것만, 내 속도에 맞춰, AI와 함께 배우세요.
            </p>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                >
                  지금 시작하기
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/app">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                >
                  학습하러 가기
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      <footer className="border-t px-6 py-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">오마카쌤</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">
              AI 기반 개인 맞춤 학습 플랫폼
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 오마카쌤. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function LightbulbIcon() {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );
}

function LayoutIcon() {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
