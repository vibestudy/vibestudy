'use client'

import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid'
import { AiGenerativeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'

export interface Task {
  id: string
  title: string
  description?: string
  status: 'pending' | 'partial' | 'passed' | 'failed'
  grade?: string
  score?: number
}

export interface Story {
  id: string
  title: string
  description: string
  tasks: Task[]
  aiFeedback?: {
    summary: string
    date: string
    taskFeedback?: Record<string, string>
  }
}

interface StoryCardProps {
  story: Story
  className?: string
}

function TaskStatusIcon({ status }: { status: Task['status'] }) {
  const baseClasses = 'flex size-4 items-center justify-center rounded-full'

  if (status === 'passed') {
    return (
      <div className={clsx(baseClasses, 'bg-white text-zinc-900 dark:bg-white dark:text-black')}>
        <CheckIcon className="size-2.5" />
      </div>
    )
  }
  if (status === 'partial') {
    return (
      <div className={clsx(baseClasses, 'bg-zinc-300 text-zinc-500 dark:bg-zinc-600 dark:text-zinc-400')}>
        <MinusIcon className="size-2.5" />
      </div>
    )
  }
  if (status === 'failed') {
    return (
      <div className={clsx(baseClasses, 'bg-zinc-300 text-zinc-500 dark:bg-zinc-600 dark:text-zinc-400')}>
        <MinusIcon className="size-2.5" />
      </div>
    )
  }
  return <div className={clsx(baseClasses, 'border-2 border-zinc-300 bg-transparent dark:border-zinc-500')} />
}

export function StoryCard({ story, className }: StoryCardProps) {
  const completedTasks = story.tasks.filter((t) => t.status === 'passed').length
  const totalTasks = story.tasks.length

  return (
    <div
      className={clsx(
        'flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white md:flex-row dark:border-zinc-700/50 dark:bg-zinc-800/50',
        className
      )}
    >
      <div className="relative flex-1 p-4">
        <div className="absolute top-12 bottom-4 left-[23px] w-px bg-zinc-200 dark:bg-zinc-700" />

        <div className="relative mb-4 flex items-start gap-3">
          <div
            className={clsx(
              'relative z-10 flex size-5 shrink-0 items-center justify-center rounded-full',
              completedTasks === totalTasks
                ? 'bg-zinc-950 text-white dark:bg-white dark:text-black'
                : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300'
            )}
          >
            {completedTasks === totalTasks ? (
              <CheckIcon className="size-3" />
            ) : (
              <span className="text-[10px] font-bold">{completedTasks}</span>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm leading-tight font-semibold text-zinc-950 dark:text-white">{story.title}</h4>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{story.description}</p>
          </div>
        </div>

        <div className="space-y-3 pl-0.5">
          {story.tasks.map((task) => (
            <div key={task.id} className="relative flex items-start gap-3">
              <div className="relative z-10 flex shrink-0 items-center justify-center">
                <TaskStatusIcon status={task.status} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs leading-tight font-medium text-zinc-800 dark:text-zinc-200">{task.title}</div>
                {task.description && (
                  <div className="mt-0.5 text-[10px] text-zinc-500 dark:text-zinc-500">{task.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {story.aiFeedback && (
        <div className="w-full border-t border-zinc-200 bg-zinc-50 p-4 md:w-[38%] md:border-t-0 md:border-l dark:border-zinc-700/50 dark:bg-zinc-800/30">
          <div className="flex items-center justify-between text-[10px] text-zinc-500">
            <span className="flex items-center gap-1 font-medium">
              <HugeiconsIcon icon={AiGenerativeIcon} size={14} />
              AI 피드백 요약
            </span>
            <span className="opacity-70">{story.aiFeedback.date}</span>
          </div>
          <div className="mt-2">
            <div className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Story 수행 요약</div>
            <p className="mt-1 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{story.aiFeedback.summary}</p>
          </div>
          {story.aiFeedback.taskFeedback && (
            <div className="mt-3 space-y-2">
              {Object.entries(story.aiFeedback.taskFeedback).map(([taskTitle, feedback]) => (
                <div key={taskTitle} className="rounded-md bg-white/80 p-2 dark:bg-black/20">
                  <div className="mb-0.5 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">{taskTitle}</div>
                  <p className="text-[10px] text-zinc-500">{feedback}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface StoryListProps {
  stories: Story[]
  className?: string
}

export function StoryList({ stories, className }: StoryListProps) {
  return (
    <div className={clsx('space-y-3', className)}>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  )
}
