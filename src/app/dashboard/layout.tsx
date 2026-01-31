'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import { LearningLayout, type Curriculum } from '@/components/dashboard'
import { useState } from 'react'

// Mock data - this would typically come from an API
const mockCurricula: Curriculum[] = [
  { id: '1', title: 'Python 웹 개발 입문', icon: 'python', progress: 59 },
  { id: '2', title: 'React Native으로 사이드 프로젝트', icon: 'react', progress: 27 },
  { id: '3', title: 'NestJS로 백엔드 정복하기', icon: 'nestjs', progress: 75 },
  { id: '4', title: 'Python 웹 개발 입문', icon: 'python', progress: 59 },
  { id: '5', title: 'React Native으로 사이드 프로젝트', icon: 'react', progress: 27 },
  { id: '6', title: 'NestJS로 백엔드 정복하기', icon: 'nestjs', progress: 75 },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>('1')

  const handleSignOut = () => {
    signOut({ redirectUrl: '/sign-in' })
  }

  const handleCreateNew = () => {
    // Navigate to curriculum creation page
    console.log('Create new curriculum')
  }

  const userData = user
    ? {
        name: user.firstName || user.username || '빌더',
        email: user.primaryEmailAddress?.emailAddress || '',
        imageUrl: user.imageUrl,
      }
    : undefined

  return (
    <LearningLayout
      curricula={mockCurricula}
      selectedCurriculumId={selectedCurriculumId}
      onSelectCurriculum={setSelectedCurriculumId}
      onCreateNew={handleCreateNew}
      user={userData}
      onSignOut={handleSignOut}
    >
      {children}
    </LearningLayout>
  )
}
