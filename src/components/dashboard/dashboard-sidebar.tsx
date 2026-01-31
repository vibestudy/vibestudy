'use client'

import { LogOut, Search, X } from 'lucide-react'
import { Avatar } from '../avatar'

export default function DashboardSidebar() {
  return (
    <aside className="flex h-full w-[280px] flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="p-6 pb-4">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-xl dark:bg-indigo-500/20">
            🍇
          </div>
          <span className="text-lg font-bold text-zinc-900 dark:text-white">Omakasem</span>
        </div>

        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="원하는 내용 검색"
            className="w-full rounded-full bg-white py-2.5 pr-9 pl-10 text-sm text-zinc-900 shadow-sm ring-1 ring-zinc-900/5 outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-white dark:ring-white/10"
          />
          <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2">
            <X className="size-4 text-zinc-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="mb-3 px-2 text-xs font-bold tracking-wider text-zinc-400 uppercase">빌더 여정들</div>
        <ul className="space-y-1">
          <li>
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-white text-lg shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10">
                🐍
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">Python 웹 개발 입문</div>
              </div>
              <span className="shrink-0 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white">
                59%
              </span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-white text-lg shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10">
                ⚛️
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  React Native으로 사이드 프로젝트
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-pink-500 px-2 py-0.5 text-[10px] font-bold text-white">
                27%
              </span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-white text-lg shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10">
                🦅
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  NestJS로 백엔드 정복하기
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                75%
              </span>
            </button>
          </li>
        </ul>
      </div>

      <div className="space-y-4 border-t border-zinc-200 p-4 dark:border-zinc-800">
        <button
          type="button"
          className="w-full rounded-full bg-black py-2.5 text-sm font-bold text-white shadow-lg shadow-zinc-900/20 transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:shadow-none dark:hover:bg-zinc-100"
        >
          + 새 빌더 여정
        </button>

        <div className="flex items-center gap-3 pt-2">
          <Avatar
            src="https://github.com/shadcn.png"
            initials="HC"
            className="size-9 bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-zinc-900 dark:text-white">한채은 빌더</div>
            <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">hanchae@gmail.com</div>
          </div>
          <button type="button" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
