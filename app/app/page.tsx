import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-8 p-8">
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-muted-foreground">무엇을 배우고 싶으신가요?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LearningCard
          title="새 학습 시작"
          description="AI에게 배우고 싶은 주제를 알려주세요"
          action="시작하기"
          href="/app/new"
        />
        <LearningCard
          title="진행 중인 학습"
          description="이어서 학습을 계속하세요"
          action="계속하기"
          href="/app/learning"
          disabled
        />
        <LearningCard
          title="완료한 학습"
          description="지금까지 완료한 학습을 확인하세요"
          action="확인하기"
          href="/app/completed"
          disabled
        />
      </div>
    </main>
  );
}

function LearningCard({
  title,
  description,
  action,
  href,
  disabled,
}: {
  title: string;
  description: string;
  action: string;
  href: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-6">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button variant="outline" disabled={disabled} className="w-fit">
        {action}
      </Button>
    </div>
  );
}
