import clsx from 'clsx'
import Image from 'next/image'

export type RatingLevel = 'beginner' | 'middle' | 'advanced'

interface AIRatingBadgeProps {
  level: RatingLevel
  range?: string
  className?: string
}

export const levelConfig: Record<RatingLevel, { label: string; color: string; textClass: string; icon: string }> = {
  beginner: {
    label: '비기너',
    color: '#3f8c4a',
    textClass: 'text-[#3f8c4a]',
    icon: '/icons/levels/level-1',
  },
  middle: {
    label: '미들',
    color: '#028AC7',
    textClass: 'text-[#028AC7]',
    icon: '/icons/levels/level-2',
  },
  advanced: {
    label: '어드밴스드',
    color: '#A855F7',
    textClass: 'text-[#A855F7]',
    icon: '/icons/levels/level-3',
  },
}

export function AIRatingBadge({ level, range, className }: AIRatingBadgeProps) {
  const config = levelConfig[level]

  return (
    <div
      className={clsx(
        'flex w-auto shrink-0 flex-col items-center justify-center gap-4 self-stretch rounded-[10px] bg-[rgba(164,164,164,0.1)] p-8 dark:bg-[rgba(245,245,245,0.04)]',
        className
      )}
    >
      <>
        <Image src={`${config.icon}-light.svg`} alt={config.label} width={64} height={64} className="dark:hidden" />
        <Image
          src={`${config.icon}-dark.svg`}
          alt={config.label}
          width={64}
          height={64}
          className="hidden dark:block"
        />
      </>
      <div className="flex flex-col items-center gap-0.5 self-stretch">
        <span className={clsx('text-center text-xl leading-[1.4] font-semibold tracking-[-0.02em]', config.textClass)}>
          {config.label}
        </span>
        {range && (
          <span className={clsx('text-center text-xs leading-[1.35] font-normal tracking-[-0.02em]', config.textClass)}>
            {range}
          </span>
        )}
      </div>
    </div>
  )
}
