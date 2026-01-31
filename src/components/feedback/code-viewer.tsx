'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface CodeViewerProps {
  repoUrl: string
  file?: string
  highlightLine?: number
  branch?: string
}

export function CodeViewer({ repoUrl, file, highlightLine, branch = 'main' }: CodeViewerProps) {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setContent(null)
      return
    }

    const fetchFile = async () => {
      setLoading(true)
      setError(null)

      try {
        const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
        if (!match) {
          setError('Invalid GitHub URL')
          return
        }

        const [, owner, repo] = match
        const cleanRepo = repo.replace(/\.git$/, '')
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${cleanRepo}/${branch}/${file}`

        const response = await fetch(rawUrl)
        if (!response.ok) {
          setError(`Failed to fetch file: ${response.status}`)
          return
        }

        const text = await response.text()
        setContent(text)
      } catch (err) {
        setError('Failed to load file')
      } finally {
        setLoading(false)
      }
    }

    fetchFile()
  }, [repoUrl, file, branch])

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-zinc-500">파일을 선택하세요</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-zinc-500">로딩 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  const lines = content?.split('\n') || []

  return (
    <div className="h-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="font-mono text-sm text-zinc-600 dark:text-zinc-400">{file}</span>
      </div>
      <div className="h-[calc(100%-40px)] overflow-auto bg-zinc-950">
        <pre className="p-4">
          <code>
            {lines.map((line, i) => {
              const lineNum = i + 1
              const isHighlighted = highlightLine === lineNum

              return (
                <div
                  key={lineNum}
                  className={clsx(
                    'flex',
                    isHighlighted && 'bg-yellow-500/20'
                  )}
                >
                  <span className="mr-4 w-8 select-none text-right font-mono text-xs text-zinc-600">
                    {lineNum}
                  </span>
                  <span className="flex-1 font-mono text-sm text-zinc-300">{line || ' '}</span>
                </div>
              )
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}
