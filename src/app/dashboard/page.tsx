import {
  ActivityHeatmap,
  AIFeedbackPanel,
  AIRatingBadge,
  ProgressBar,
  ProgressDisplay,
  type Epic,
  type Story,
  type Task,
} from '@/components/dashboard'
import { getActivityData, getCurricula, getCurriculumById, getCurriculumTasks } from '@/lib/curricula'
import type { TaskDocument } from '@/lib/types'
import { AiGenerativeIcon, Github01Icon, LinkSquare02Icon, SourceCodeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { DashboardClient } from './dashboard-client'

function transformToEpics(
  structure:
    | { epics: { title: string; description: string; stories: { title: string; description: string }[] }[] }
    | undefined
): Epic[] {
  if (!structure?.epics) return []
  return structure.epics.map((epic, index) => ({
    id: String(index + 1),
    title: epic.title,
  }))
}

function transformTaskToUI(task: TaskDocument): Task {
  return {
    id: task._id.toString(),
    title: task.title,
    status: task.status,
    grade: task.grade_result?.grade,
    score: task.grade_result?.percentage,
  }
}

function transformToStoriesWithTasks(
  structure:
    | { epics: { title: string; description: string; stories: { title: string; description: string }[] }[] }
    | undefined,
  epicIndex: number,
  allTasks: TaskDocument[]
): Story[] {
  if (!structure?.epics) return []
  const epic = structure.epics[epicIndex]
  if (!epic) return []

  return epic.stories.map((story, storyIndex) => {
    const storyTasks = allTasks
      .filter((t) => t.epic_index === epicIndex && t.story_index === storyIndex)
      .map(transformTaskToUI)

    return {
      id: `${epicIndex + 1}-${storyIndex + 1}`,
      title: story.title,
      description: story.description,
      tasks: storyTasks,
    }
  })
}

export default async function DashboardPage() {
  const [curricula, activityData] = await Promise.all([getCurricula(), getActivityData(154)])

  const firstCurriculum = curricula.length > 0 ? await getCurriculumById(curricula[0].id) : null

  if (!firstCurriculum) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <div className="text-zinc-500">아직 빌더 여정이 없습니다</div>
        <Link
          href="/onboarding"
          className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          새 빌더 여정 시작하기
        </Link>
      </div>
    )
  }

  const tasks = await getCurriculumTasks(firstCurriculum.id)
  const epics = transformToEpics(firstCurriculum.structure)
  const initialStories = transformToStoriesWithTasks(firstCurriculum.structure, 0, tasks)
  const progress = firstCurriculum.progress

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <HugeiconsIcon icon={SourceCodeIcon} size={20} className="text-zinc-600 dark:text-zinc-300" />
        </div>
        <h1 className="text-base font-semibold text-zinc-950 dark:text-white">{firstCurriculum.title}</h1>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="text-sm text-zinc-500 dark:text-zinc-400/70">AI 평가 기준 진행도</div>
          <ProgressDisplay progress={progress} />
          <Link
            href="https://github.com/avanturation/python-web"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-sm text-zinc-950 transition-colors hover:bg-zinc-200 dark:bg-zinc-800/60 dark:text-white dark:hover:bg-zinc-700/60"
          >
            <HugeiconsIcon icon={Github01Icon} size={20} />
            <span>avanturation/python-web</span>
            <HugeiconsIcon icon={LinkSquare02Icon} size={16} className="text-zinc-400" />
          </Link>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
        >
          <HugeiconsIcon icon={AiGenerativeIcon} size={16} />
          채점 후 피드백
        </button>
      </div>

      <div className="mt-6 rounded-[14px] border border-zinc-200 dark:border-zinc-700/50">
        <div className="flex flex-col gap-2 p-2 sm:flex-row">
          <div className="flex shrink-0 items-center justify-center rounded-[10px] bg-zinc-100 px-6 py-5 dark:bg-zinc-800/60">
            <AIRatingBadge level="middle" range="32% ~ 64%" />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-4 rounded-[10px] bg-zinc-100 px-5 py-4 dark:bg-zinc-800/60">
            <ProgressBar progress={progress} />
            <ActivityHeatmap data={activityData} />
          </div>
        </div>

        <div className="rounded-b-[14px] bg-zinc-100 px-5 py-4 dark:bg-zinc-800/60">
          <AIFeedbackPanel
            weekLabel="AI 이번주 평가"
            feedback={firstCurriculum.weekly_summary || '이번 주에 완료된 과제가 없습니다. 새로운 과제에 도전해보세요!'}
          />
        </div>
      </div>

      {epics.length > 0 && (
        <DashboardClient
          epics={epics}
          structure={firstCurriculum.structure}
          oneLiner={firstCurriculum.one_liner}
          initialStories={initialStories}
          allTasks={tasks}
        />
      )}
    </>
  )
}
