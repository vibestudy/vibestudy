import { auth } from '@clerk/nextjs/server'
import { getDb } from './mongodb'
import type { CurriculumDocument, CurriculumListItem } from './types'

export async function getCurricula(): Promise<CurriculumListItem[]> {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  try {
    const db = await getDb()
    const collection = db.collection<CurriculumDocument>('curricula')

    const curricula = await collection.find({ clerk_user_id: userId }).sort({ updated_at: -1 }).toArray()

    return curricula.map((doc) => ({
      id: doc._id.toString(),
      title: doc.course_title,
      icon: doc.icon,
      progress: doc.total_tasks > 0 ? Math.round((doc.completed_tasks / doc.total_tasks) * 100) : 0,
      status: doc.status,
    }))
  } catch (error) {
    console.error('Error fetching curricula:', error)
    return []
  }
}
