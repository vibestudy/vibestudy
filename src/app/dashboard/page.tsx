import ActivityHeatmap from '@/components/dashboard/activity-heatmap'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import EpicNavigation from '@/components/dashboard/epic-navigation'
import StoryCard from '@/components/dashboard/story-card'

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950">
      <div className="w-[280px] flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800">
        <DashboardSidebar />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl p-8">
          <header className="mb-8">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">🐍</span>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Python 웹 개발 입문</h1>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">나의 진행 상황</p>
          </header>

          <div className="space-y-8">
            <section>
              <ActivityHeatmap />
            </section>

            <section>
              <EpicNavigation />
            </section>

            <section>
              <StoryCard />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
