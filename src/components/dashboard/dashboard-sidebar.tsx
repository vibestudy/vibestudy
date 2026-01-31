'use client'

import { LogOut, Plus, Search } from 'lucide-react'

// Course data with emoji icons
const courses = [
  { id: 1, emoji: '🐍', title: 'Python 웹 개발 입문', progress: 59, progressColor: 'bg-orange-500' },
  { id: 2, emoji: '⚛️', title: 'React로 시작하는 프론트엔드', progress: 27, progressColor: 'bg-pink-500' },
  { id: 3, emoji: '🪺', title: 'NestJS 백엔드 마스터', progress: 75, progressColor: 'bg-green-500' },
]

export default function DashboardSidebar() {
  return (
    <aside className="flex h-full w-[280px] flex-col bg-white dark:bg-zinc-950">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-3 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`size-1.5 rounded-full ${
                  i < 6 ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="원하는 내용 검색"
            className="h-10 w-full rounded-lg bg-zinc-100 pr-4 pl-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900 focus:outline-none dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-white"
          />
        </div>
      </div>

      {/* Builder Journeys Section */}
      <div className="mt-6 flex-1 overflow-y-auto px-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">빌더 여정들</span>
        </div>

        {/* Course List */}
        <div className="space-y-1">
          {courses.map((course, index) => (
            <button
              key={course.id}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                index === 0 ? 'bg-zinc-100 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'
              }`}
            >
              <span className="text-lg">{course.emoji}</span>
              <span className="flex-1 truncate text-sm font-medium text-zinc-900 dark:text-white">{course.title}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold text-white ${course.progressColor}`}>
                {course.progress}%
              </span>
            </button>
          ))}
        </div>

        {/* New Journey Button */}
        <button className="mt-3 flex w-full items-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
          <Plus className="size-4" />
          <span>새 빌더 여정</span>
        </button>
      </div>

      {/* Profile Section */}
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">한채은 빌더</p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">builder@vibestudy.io</p>
          </div>
          <button className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
