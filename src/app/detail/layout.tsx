import { ApplicationLayout } from '@/app/dashboard/application-layout'
import { getCurricula } from '@/lib/curricula'

export default async function DetailLayout({ children }: { children: React.ReactNode }) {
  const curricula = await getCurricula()

  return <ApplicationLayout curricula={curricula}>{children}</ApplicationLayout>
}
