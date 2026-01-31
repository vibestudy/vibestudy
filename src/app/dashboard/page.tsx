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
import { useState } from 'react'

// Mock data for the selected curriculum
const mockEpics: Epic[] = [
  { id: '1', title: 'Python 기초' },
  { id: '2', title: '웹 개발 기초' },
  { id: '3', title: 'FastAPI 시작' },
  { id: '4', title: 'DB 연동' },
  { id: '5', title: '인증과 보안' },
  { id: '6', title: '배포와 운영' },
]

const mockStories: Story[] = [
  {
    id: '1',
    title: '개발 환경 설정',
    description: 'FastAPI 개발을 위한 Python 가상환경과 필수 패키지를 설치합니다.',
    tasks: [
      {
        id: '1-1',
        title: '가상환경 생성',
        description: 'python -m venv venv 명령으로 가상환경 생성 완료',
        status: 'completed',
      },
      {
        id: '1-2',
        title: 'FastAPI 설치',
        description: 'pip install fastapi uvicorn 실행 후 import fastapi 성공',
        status: 'completed',
      },
      {
        id: '1-3',
        title: 'Hello World API 작성',
        description: 'GET / 엔드포인트가 {"message": "Hello World"} 반환',
        status: 'in_progress',
      },
    ],
    aiFeedback: {
      summary: '가상 환경과 패키지는 이해하고 있지만, 엔드포인트에 대한 이해는 부족합니다.',
      date: '2026년 5월 9일 02:20',
      taskFeedback: {
        '가상환경 생성': 'venv 생성을 통해 적절한 가상 환경을 구현했습니다.',
        'FastAPI 설치': 'pip를 통해 FastAPI와 uvicorn 패키지를 설치해, 성공적으로 환경을 구성했습니다.',
        'Hello World API 작성': '엔드포인트에 대한 이해가 부족하여, GET과 POST를 사용하지 못하였습니다.',
      },
    },
  },
  {
    id: '2',
    title: '라우팅과 경로 매개변수',
    description: 'FastAPI의 라우팅 시스템과 경로/쿼리 매개변수 사용법을 학습합니다.',
    tasks: [
      {
        id: '2-1',
        title: '경로 매개변수 정의',
        description: '/users/{user_id} 형태의 동적 경로 구현',
        status: 'pending',
      },
      {
        id: '2-2',
        title: '쿼리 매개변수 처리',
        description: '필터링, 페이지네이션을 위한 쿼리 파라미터 구현',
        status: 'pending',
      },
      {
        id: '2-3',
        title: 'Pydantic 모델 활용',
        description: '요청/응답 데이터 검증을 위한 모델 정의',
        status: 'pending',
      },
    ],
  },
]

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateMockActivityData() {
  const data = []
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

export default function DashboardPage() {
  const [selectedEpicId, setSelectedEpicId] = useState('3')
  const activityData = generateMockActivityData()

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3">
        <HugeiconsIcon icon={SourceCodeIcon} size={28} className="text-zinc-950 dark:text-white" />
        <Heading>Python 웹 개발 입문</Heading>
      </div>

      {/* Progress Section */}
      <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
        <ProgressDisplay progress={59} />
        <button className="flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
          <HugeiconsIcon icon={AiGenerativeIcon} size={16} />
          채점 후 피드백
        </button>
      </div>

      {/* Heatmap and Rating Widget - outer ring only */}
      <div className="mt-8 rounded-2xl border border-zinc-300/50 p-1 dark:border-zinc-700/30">
        <div className="flex gap-1">
          {/* Box 1: AI Rating */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-zinc-100 px-6 py-6 dark:bg-zinc-800/50">
            <AIRatingBadge level="middle" range="32% ~ 64%" />
          </div>

          {/* Box 2: Progress + Heatmap */}
          <div className="flex-1 rounded-xl bg-zinc-100 px-6 py-6 dark:bg-zinc-800/50">
            <ProgressBar progress={59} className="mb-4" />
            <ActivityHeatmap data={activityData} />
          </div>
        </div>

        {/* Box 3: Weekly Feedback */}
        <div className="mt-1 rounded-xl bg-zinc-100 px-6 py-4 dark:bg-zinc-800/50">
          <AIFeedbackPanel weekLabel="AI 이번주 평가" feedback="존나잘했다!!" />
        </div>
      </div>

      {/* Epic Navigation */}
      <div className="mt-8">
        <EpicNavigation epics={mockEpics} selectedEpicId={selectedEpicId} onSelectEpic={setSelectedEpicId} />
      </div>

      {/* Story Section */}
      <div className="mt-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Story 구성</h2>
          <p className="text-sm text-zinc-500">FastAPI 프레임워크를 사용하여 첫 번째 API를 구축합니다</p>
        </div>

        <div className="mt-4">
          <StoryList stories={mockStories} />
        </div>
      </div>
    </>
  )
}
