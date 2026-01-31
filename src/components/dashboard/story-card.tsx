import { FileText, Star } from 'lucide-react'

export default function StoryCard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Story 구성</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">이번 주차에 진행할 학습 스토리와 실습 과제입니다.</p>
      </div>

      <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Star className="h-6 w-6 fill-zinc-900 text-zinc-900 dark:fill-white dark:text-white" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 text-xl font-bold text-zinc-900 dark:text-white">개발 환경 설정</h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Python 웹 개발을 위한 기초 환경을 구축합니다. 가상환경 관리부터 프레임워크 설치까지 실무 표준을
              학습합니다.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <TaskItem title="가상환경 생성" description="python -m venv venv && source venv/bin/activate" />
          <TaskItem title="FastAPI 설치" description="pip install fastapi uvicorn[standard]" />
          <TaskItem title="Hello World API 작성" description="GET / 엔드포인트가 포함된 main.py 작성" />
        </div>
      </div>
    </div>
  )
}

function TaskItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex cursor-default items-center gap-3 rounded-xl bg-zinc-50 p-3 transition-colors hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-700">
        <FileText className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">{title}</p>
        <p className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  )
}
