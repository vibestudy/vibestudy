import { auth } from '@clerk/nextjs/server'
import { ObjectId } from 'mongodb'
import { getDb } from './mongodb'
import type {
  ActivityData,
  ActivityDocument,
  CurriculumDetail,
  CurriculumDocument,
  CurriculumListItem,
  TaskDocument,
} from './types'

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

export async function getCurriculumById(id: string): Promise<CurriculumDetail | null> {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  try {
    const db = await getDb()
    const collection = db.collection<CurriculumDocument>('curricula')

    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return null
    }

    const doc = await collection.findOne({
      _id: objectId,
      clerk_user_id: userId,
    })

    if (!doc) {
      return null
    }

    return {
      id: doc._id.toString(),
      title: doc.course_title,
      one_liner: doc.one_liner,
      icon: doc.icon,
      progress: doc.total_tasks > 0 ? Math.round((doc.completed_tasks / doc.total_tasks) * 100) : 0,
      status: doc.status,
      total_hours: doc.total_hours,
      total_tasks: doc.total_tasks,
      completed_tasks: doc.completed_tasks,
      structure: doc.structure,
    }
  } catch (error) {
    console.error('Error fetching curriculum:', error)
    return null
  }
}

export async function getCurriculumTasks(curriculumId: string): Promise<TaskDocument[]> {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  try {
    const db = await getDb()
    const collection = db.collection<TaskDocument>('tasks')

    let objectId: ObjectId
    try {
      objectId = new ObjectId(curriculumId)
    } catch {
      return []
    }

    const tasks = await collection.find({ curriculum_id: objectId }).sort({ epic_index: 1, story_index: 1 }).toArray()

    return tasks
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
}

export async function getActivityData(days: number = 154): Promise<ActivityData[]> {
  const { userId } = await auth()

  if (!userId) {
    return generateEmptyActivityData(days)
  }

  try {
    const db = await getDb()
    const collection = db.collection<ActivityDocument>('activities')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    const startDateStr = startDate.toISOString().split('T')[0]

    const activities = await collection
      .find({
        clerk_user_id: userId,
        date: { $gte: startDateStr },
      })
      .sort({ date: 1 })
      .toArray()

    const activityMap = new Map<string, number>()
    for (const activity of activities) {
      const existing = activityMap.get(activity.date) || 0
      activityMap.set(activity.date, existing + activity.count)
    }

    const response: ActivityData[] = []
    const today = new Date()
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      response.push({
        date: dateStr,
        count: activityMap.get(dateStr) || 0,
      })
    }

    return response
  } catch (error) {
    console.error('Error fetching activities:', error)
    return generateEmptyActivityData(days)
  }
}

function generateEmptyActivityData(days: number): ActivityData[] {
  const response: ActivityData[] = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    response.push({
      date: date.toISOString().split('T')[0],
      count: 0,
    })
  }
  return response
}
