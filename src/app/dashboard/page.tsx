'use client'

import {
  ActivityHeatmap,
  AIFeedbackPanel,
  AIRatingBadge,
  EpicNavigation,
  ProgressBar,
  ProgressDisplay,
  StoryList,
  type Epic,
  type Story,
} from '@/components/dashboard'
import { Heading } from '@/components/heading'
import { AiGenerativeIcon, SourceCodeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useEffect, useState } from 'react'

interface ActivityData {
  date: string
  count: number
}

interface CurriculumData {
  id: string
  title: string
  one_liner: string
  progress: number
  structure: {
    epics: {
      title: string
      description: string
      stories: { title: string; description: string }[]
    }[]
  }
  weekly_summary?: string
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateMockActivityData(): ActivityData[] {
  const data: ActivityData[] = []
  const baseDate = new Date('2026-01-31')
  for (let i = 0; i < 154; i++) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() - i)
    const rand = seededRandom(i * 12345)
    let count = 0
    if (rand > 0.65) count = Math.floor(seededRandom(i * 67890) * 8) + 1
    data.push({
      date: date.toISOString().split('T')[0],
      count,
    })
  }
  return data.reverse()
}

function transformToEpics(structure: CurriculumData['structure']): Epic[] {
  return structure.epics.map((epic, index) => ({
    id: String(index + 1),
    title: epic.title,
  }))
}

function transformToStories(structure: CurriculumData['structure'], epicIndex: number): Story[] {
  const epic = structure.epics[epicIndex]
  if (!epic) return []

  return epic.stories.map((story, index) => ({
    id: `${epicIndex + 1}-${index + 1}`,
    title: story.title,
    description: story.description,
    tasks: [],
  }))
}

export default function DashboardPage() {
  const [curriculum, setCurriculum] = useState<CurriculumData | null>(null)
  const [activityData, setActivityData] = useState<ActivityData[]>([])
  const [selectedEpicId, setSelectedEpicId] = useState('1')
  const [loading, setLoading] = useState(true)
  const [weeklySummary, setWeeklySummary] = useState<string>('')

  useEffect(() => {
    async function fetchData() {
      try {
        const [curriculaRes, activitiesRes] = await Promise.all([fetch('/api/curricula'), fetch('/api/activities')])

        if (curriculaRes.ok) {
          const curricula = await curriculaRes.json()
          if (curricula.length > 0) {
            const firstCurriculumId = curricula[0].id
            const curriculumRes = await fetch(`/api/curricula/${firstCurriculumId}`)
            if (curriculumRes.ok) {
              const data = await curriculumRes.json()
              setCurriculum({
                id: data.curriculum_id || data.id,
                title: data.course_title || data.title,
                one_liner: data.one_liner,
                progress: data.progress,
                structure: data.structure,
                weekly_summary: data.weekly_summary,
              })
              setWeeklySummary(data.weekly_summary || '')
            }
          }
        }

        if (activitiesRes.ok) {
          const activities = await activitiesRes.json()
          setActivityData(activities.length > 0 ? activities : generateMockActivityData())
        } else {
          setActivityData(generateMockActivityData())
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setActivityData(generateMockActivityData())
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const epics = curriculum ? transformToEpics(curriculum.structure) : []
  const selectedEpicIndex = parseInt(selectedEpicId, 10) - 1
  const stories = curriculum ? transformToStories(curriculum.structure, selectedEpicIndex) : []
  const progress = curriculum?.progress ?? 0

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-zinc-500">로딩 중...</div>
      </div>
    )
  }

  if (!curriculum) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <div className="text-zinc-500">아직 빌더 여정이 없습니다</div>
        <a
          href="/onboarding"
          className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          새 빌더 여정 시작하기
        </a>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <HugeiconsIcon icon={SourceCodeIcon} size={28} className="text-zinc-950 dark:text-white" />
        <Heading>{curriculum.title}</Heading>
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
        <ProgressDisplay progress={progress} />
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          <HugeiconsIcon icon={AiGenerativeIcon} size={16} />
          채점 후 피드백
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-300/50 p-1 dark:border-zinc-700/30">
        <div className="flex gap-1">
          <div className="flex flex-col items-center justify-center rounded-xl bg-zinc-100 px-6 py-6 dark:bg-zinc-800/50">
            <AIRatingBadge level="middle" range="32% ~ 64%" />
          </div>

          <div className="flex-1 rounded-xl bg-zinc-100 px-6 py-6 dark:bg-zinc-800/50">
            <ProgressBar progress={progress} className="mb-4" />
            <ActivityHeatmap data={activityData} />
          </div>
        </div>

        <div className="mt-1 rounded-xl bg-zinc-100 px-6 py-4 dark:bg-zinc-800/50">
          <AIFeedbackPanel
            weekLabel="AI 이번주 평가"
            feedback={weeklySummary || '이번 주에 완료된 과제가 없습니다. 새로운 과제에 도전해보세요!'}
          />
        </div>
      </div>

      {epics.length > 0 && (
        <div className="mt-8">
          <EpicNavigation epics={epics} selectedEpicId={selectedEpicId} onSelectEpic={setSelectedEpicId} />
        </div>
      )}

      {stories.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Story 구성</h2>
            <p className="text-sm text-zinc-500">{curriculum.one_liner}</p>
          </div>

          <div className="mt-4">
            <StoryList stories={stories} />
          </div>
        </div>
      )}
    </>
  )
}
