import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-primary">
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

      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
        <div className="flex max-w-3xl flex-col gap-6">
          <h1 className="text-5xl font-bold tracking-tight">
            배우고 싶은 것만 말하세요.
            <br />
            <span className="text-primary">AI가 알아서 가르쳐드립니다.</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            오마카쌤은 당신이 배우고 싶은 개발 주제를 작은 단위로 쪼개고,
            <br />
            직접 실습하며 AI가 채점까지 해주는 학습 플랫폼입니다.
          </p>
        </div>

        <div className="flex gap-4">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg" className="h-12 px-8 text-base">
                무료로 시작하기
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/app">
              <Button size="lg" className="h-12 px-8 text-base">
                학습 시작하기
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      <section className="border-t bg-muted/30 px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
          <FeatureCard
            title="AI 커리큘럼"
            description="배우고 싶은 것을 말하면 AI가 최적의 학습 순서로 커리큘럼을 생성합니다."
          />
          <FeatureCard
            title="작은 단위 학습"
            description="복잡한 개념도 소화하기 쉬운 크기로 쪼개서 단계별로 학습합니다."
          />
          <FeatureCard
            title="AI 채점"
            description="과제를 제출하면 AI가 즉시 피드백과 함께 채점해드립니다."
          />
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">부트캠프는 이제 그만.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            비싼 돈 들여 정해진 커리큘럼 따라가는 시대는 끝났습니다.
            <br />
            내가 필요한 것만, 내 속도에 맞춰, AI와 함께 배우세요.
          </p>
          <div className="mt-8">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="h-12 px-8 text-base">
                  지금 시작하기
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/app">
                <Button size="lg" className="h-12 px-8 text-base">
                  학습하러 가기
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      <footer className="border-t px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="text-sm text-muted-foreground">
            2025 오마카쌤. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
