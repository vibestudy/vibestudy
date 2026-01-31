'use client'

import { FileText, Star } from 'lucide-react'

const tasks = [
  {
    id: 1,
    title: '가상환경 생성',
    command: 'python -m venv venv && source venv/bin/activate',
    completed: false,
  },
  {
    id: 2,
    title: 'FastAPI 설치',
    command: 'pip install fastapi uvicorn',
    completed: false,
  },
  {
    id: 3,
    title: 'Hello World API 작성',
    command: 'GET / 엔드포인트가 {"message": "Hello World"} 를 반환',
    completed: false,
  },
]

export default function StoryCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      {/* Story Header */}
      <div className="flex items-start gap-4 bg-zinc-50 p-5 dark:bg-zinc-800">
        <div className="flex size-10 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
          <Star className="size-5 text-zinc-600 dark:text-zinc-400" />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Story 구성</span>
          </div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-white">개발 환경 설정</h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            FastAPI 프레임워크를 사용하여 첫 번째 API를 구축합니다.
          </p>
        </div>
      </div>

      {/* Task List */}
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start gap-4 p-5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <FileText className="size-4 text-zinc-500 dark:text-zinc-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-white">{task.title}</h4>
              <code className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">{task.command}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
