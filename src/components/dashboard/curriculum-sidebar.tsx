'use client'

import clsx from 'clsx'
import { Avatar } from '@/components/avatar'
import { Input, InputGroup } from '@/components/input'
import { Button } from '@/components/button'
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  PlusIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid'
import { Badge } from '@/components/badge'

export interface Curriculum {
  id: string
  title: string
  icon?: string
  progress: number
}

interface CurriculumSidebarProps {
  curricula: Curriculum[]
  selectedCurriculumId?: string
  onSelectCurriculum?: (id: string) => void
  onCreateNew?: () => void
  user?: {
    name: string
    email: string
    imageUrl?: string
  }
  onSignOut?: () => void
}

function getProgressColor(progress: number): 'lime' | 'yellow' | 'cyan' | 'zinc' {
  if (progress >= 70) return 'lime'
  if (progress >= 40) return 'cyan'
  if (progress >= 20) return 'yellow'
  return 'zinc'
}

function CurriculumIcon({ icon, className }: { icon?: string; className?: string }) {
  const iconMap: Record<string, string> = {
    python: '🐍',
    react: '⚛️',
    nestjs: '🐈',
    default: '📚',
  }

  return (
    <span className={clsx('text-lg', className)}>
      {iconMap[icon || 'default'] || iconMap.default}
    </span>
  )
}

export function CurriculumSidebar({
  curricula,
  selectedCurriculumId,
  onSelectCurriculum,
  onCreateNew,
  user,
  onSignOut,
}: CurriculumSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-zinc-900">
      {/* Logo */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-2">
        <InputGroup>
          <MagnifyingGlassIcon data-slot="icon" className="text-zinc-500" />
          <Input
            type="search"
            placeholder="원하는 내용 검색"
            className="dark:bg-zinc-800"
          />
          <XMarkIcon data-slot="icon" className="cursor-pointer text-zinc-500 hover:text-zinc-400" />
        </InputGroup>
      </div>

      {/* New Journey Button */}
      <div className="px-4 py-2">
        <Button outline className="w-full justify-center" onClick={onCreateNew}>
          <PlusIcon className="size-4" />
          새 빌더 여정
        </Button>
      </div>

      {/* Curriculum List */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <h3 className="mb-2 text-xs font-medium text-zinc-500">빌더 여정들</h3>
        <div className="space-y-1">
          {curricula.map((curriculum) => (
            <button
              key={curriculum.id}
              onClick={() => onSelectCurriculum?.(curriculum.id)}
              className={clsx(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                selectedCurriculumId === curriculum.id
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              )}
            >
              <div className="flex min-w-0 items-center gap-2">
                <CurriculumIcon icon={curriculum.icon} className="shrink-0" />
                <span className="truncate">{curriculum.title}</span>
              </div>
              <Badge color={getProgressColor(curriculum.progress)} className="ml-2 shrink-0">
                {curriculum.progress}%
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      {user && (
        <div className="border-t border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar src={user.imageUrl} className="size-10" square />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">{user.name}</div>
                <div className="truncate text-xs text-zinc-500">{user.email}</div>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-white"
            >
              <ArrowRightStartOnRectangleIcon className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
