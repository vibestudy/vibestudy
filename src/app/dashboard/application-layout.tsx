'use client'

import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { Input, InputGroup } from '@/components/input'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import {
  QuestionMarkCircleIcon,
  SparklesIcon,
} from '@heroicons/react/20/solid'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  CodeIcon,
  SourceCodeIcon,
  SourceCodeSquareIcon,
  GridIcon,
  BookOpen01Icon,
} from '@hugeicons/core-free-icons'
import { usePathname } from 'next/navigation'
import { useUser, useClerk } from '@clerk/nextjs'

// Icon mapping for curriculum types
const curriculumIcons: Record<string, typeof CodeIcon> = {
  python: SourceCodeIcon,
  react: GridIcon,
  nestjs: SourceCodeSquareIcon,
  default: BookOpen01Icon,
}

// Mock curriculum data - would come from API in production
const curricula = [
  { id: '1', title: 'Python 웹 개발 입문', icon: 'python', progress: 59 },
  { id: '2', title: 'React Native으로 사이드 프로...', icon: 'react', progress: 27 },
  { id: '3', title: 'NestJS로 백엔드 정복하기', icon: 'nestjs', progress: 75 },
  { id: '4', title: 'Python 웹 개발 입문', icon: 'python', progress: 59 },
  { id: '5', title: 'React Native으로 사이드 프로...', icon: 'react', progress: 27 },
  { id: '6', title: 'NestJS로 백엔드 정복하기', icon: 'nestjs', progress: 75 },
  { id: '7', title: 'Python 웹 개발 입문', icon: 'python', progress: 59 },
  { id: '8', title: 'React Native으로 사이드 프로...', icon: 'react', progress: 27 },
  { id: '9', title: 'NestJS로 백엔드 정복하기', icon: 'nestjs', progress: 75 },
]

function getProgressColor(progress: number): 'lime' | 'yellow' | 'cyan' | 'zinc' {
  if (progress >= 70) return 'lime'
  if (progress >= 40) return 'cyan'
  if (progress >= 20) return 'yellow'
  return 'zinc'
}

function AccountDropdownMenu({
  anchor,
  onSignOut,
}: {
  anchor: 'top start' | 'bottom end'
  onSignOut: () => void
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={onSignOut}>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout({
  children,
}: {
  events?: unknown
  children: React.ReactNode
}) {
  let pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk()

  const handleSignOut = () => {
    signOut({ redirectUrl: '/sign-in' })
  }

  const userDisplayName = user?.firstName || user?.username || '빌더'
  const userEmail = user?.primaryEmailAddress?.emailAddress || ''
  const userImageUrl = user?.imageUrl

  // For now, first curriculum is selected
  const selectedCurriculumId = '1'

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src={userImageUrl} square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" onSignOut={handleSignOut} />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            {/* Logo */}
            <div className="flex items-center gap-2 px-2">
              <HugeiconsIcon icon={CodeIcon} size={28} className="text-zinc-950 dark:text-white" />
            </div>

            {/* Search */}
            <div className="mt-4">
              <InputGroup>
                <MagnifyingGlassIcon data-slot="icon" />
                <Input type="search" placeholder="원하는 내용 검색" />
              </InputGroup>
            </div>

            {/* New Journey Button */}
            <div className="mt-3">
              <Button outline className="w-full justify-center">
                <PlusIcon className="size-4" />
                새 빌더 여정
              </Button>
            </div>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarHeading>빌더 여정들</SidebarHeading>
              {curricula.map((curriculum) => {
                const IconComponent = curriculumIcons[curriculum.icon] || curriculumIcons.default
                return (
                  <SidebarItem
                    key={curriculum.id}
                    href={`/dashboard/curriculum/${curriculum.id}`}
                    current={selectedCurriculumId === curriculum.id}
                  >
                    <HugeiconsIcon
                      icon={IconComponent}
                      size={20}
                      className="shrink-0"
                    />
                    <SidebarLabel>{curriculum.title}</SidebarLabel>
                    <Badge color={getProgressColor(curriculum.progress)} className="ml-auto">
                      {curriculum.progress}%
                    </Badge>
                  </SidebarItem>
                )
              })}
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar src={userImageUrl} className="size-10" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {userDisplayName}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {userEmail}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" onSignOut={handleSignOut} />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
