'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { FeedbackList } from './feedback-list'
import { CodeViewer } from './code-viewer'
import type { ReviewResult } from './types'

interface FeedbackPanelProps {
  repoUrl: string
  branch?: string
  reviewId?: string
}

export function FeedbackPanel({ repoUrl, branch = 'main', reviewId: initialReviewId }: FeedbackPanelProps) {
  const [reviewId, setReviewId] = useState<string | null>(initialReviewId || null)
  const [review, setReview] = useState<ReviewResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | undefined>()
  const [selectedLine, setSelectedLine] = useState<number | undefined>()

  const startReview = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: repoUrl, branch }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to start review')
        return
      }

      const data = await response.json()
      setReviewId(data.review_id)
    } catch (err) {
      setError('Failed to start review')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!reviewId) return

    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/review/${reviewId}`)
        if (!response.ok) return

        const data: ReviewResult = await response.json()
        setReview(data)

        if (data.status === 'pending' || data.status === 'cloning' || data.status === 'running') {
          setTimeout(fetchReview, 2000)
        }
      } catch (err) {
        console.error('Error fetching review:', err)
      }
    }

    fetchReview()
  }, [reviewId])

  const handleSelectFeedback = (file: string, line: number) => {
    setSelectedFile(file)
    setSelectedLine(line)
  }

  if (!reviewId) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <Heading className="mb-4">코드 리뷰</Heading>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          AI가 코드를 분석하여 보안, 성능, 아키텍처 등에 대한 피드백을 제공합니다.
        </p>
        <Button onClick={startReview} disabled={loading}>
          {loading ? '시작 중...' : '리뷰 시작'}
        </Button>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  if (!review || review.status === 'pending' || review.status === 'cloning' || review.status === 'running') {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <Heading className="mb-4">코드 리뷰</Heading>
        <div className="flex items-center gap-3">
          <div className="size-4 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-500" />
          <span className="text-zinc-600 dark:text-zinc-400">
            {review?.status === 'cloning' ? '레포지토리 클론 중...' : '분석 중...'}
          </span>
        </div>
      </div>
    )
  }

  if (review.status === 'failed') {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <Heading className="mb-4">코드 리뷰</Heading>
        <p className="text-red-500">리뷰 실패: {review.error}</p>
        <Button onClick={startReview} className="mt-4">
          다시 시도
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
        <Heading>채점 후 피드백</Heading>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="max-h-[600px] overflow-y-auto border-r border-zinc-200 p-4 dark:border-zinc-800">
          <FeedbackList
            suggestions={review.suggestions}
            diagnostics={review.results}
            selectedFile={selectedFile}
            selectedLine={selectedLine}
            onSelectFeedback={handleSelectFeedback}
          />
        </div>
        <div className="h-[600px] p-4">
          <CodeViewer
            repoUrl={repoUrl}
            file={selectedFile}
            highlightLine={selectedLine}
            branch={branch}
          />
        </div>
      </div>
    </div>
  )
}
