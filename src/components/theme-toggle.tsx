'use client'

import { DropdownItem, DropdownLabel } from '@/components/dropdown'
import { ComputerDesk01Icon, Moon02Icon, Sun02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTheme } from 'next-themes'

export function ThemeToggleDropdownItem() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
  const icon = theme === 'system' ? ComputerDesk01Icon : resolvedTheme === 'dark' ? Moon02Icon : Sun02Icon
  const label = theme === 'system' ? '시스템 설정' : resolvedTheme === 'dark' ? '다크 모드' : '라이트 모드'

  return (
    <DropdownItem onClick={() => setTheme(nextTheme)}>
      <span data-slot="icon">
        <HugeiconsIcon icon={icon} size={16} />
      </span>
      <DropdownLabel>{label}</DropdownLabel>
    </DropdownItem>
  )
}
