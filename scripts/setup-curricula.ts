import { Document, MongoClient, ObjectId } from 'mongodb'

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://mongo:vqnNmrDsfptOKXcytmsKtlOcnNprQZiq@maglev.proxy.rlwy.net:58940/?authSource=admin'
const DB_NAME = 'omakasem'

interface CurriculumDoc {
  session_id: string
  course_title: string
  one_liner: string
  student_id: null
  clerk_user_id: null
  status: 'approved' | 'disabled'
  total_hours: number
  total_tasks: number
  completed_tasks: number
  icon_id: string
  git_repo?: string
  structure: {
    epics: {
      title: string
      description: string
      stories: { title: string; description: string }[]
    }[]
  }
  created_at: Date
  updated_at: Date
}

interface TaskDoc {
  _id: string
  curriculum_id: ObjectId
  epic_index: number
  story_index: number
  epic_title: string
  story_title: string
  title: string
  description: string
  acceptance_criteria: { description: string; weight: number }[]
  estimated_minutes: number
  status: 'pending' | 'partial' | 'passed'
  grade_result: null
  created_at: Date
  updated_at: Date
}

const CURRICULA_TO_DISABLE = [
  '697e3d9987600bed4dbbc684',
  '697e4fb587600bed4dbbc685',
  '697e503687600bed4dbbc686',
  '697e73426d77e7cb41c72663',
  '697e80341bc39415135d833a',
  '697e82521bc39415135d833b',
  '697e84511bc39415135d833d',
]

const SAMPLE_CURRICULA: Omit<CurriculumDoc, 'created_at' | 'updated_at'>[] = [
  {
    session_id: 'sample-threads-api',
    course_title: 'Threads API 리버스 엔지니어링',
    one_liner: 'Instagram Threads 비공식 API를 분석하고 TypeScript로 구현하기',
    student_id: null,
    clerk_user_id: null,
    status: 'approved',
    total_hours: 20,
    total_tasks: 8,
    completed_tasks: 0,
    icon_id: 'thread-api',
    git_repo: 'https://github.com/junhoyeo/threads-api',
    structure: {
      epics: [
        {
          title: 'API 분석 및 환경 설정',
          description: 'Threads 웹 클라이언트를 분석하여 API 구조를 파악하고 개발 환경을 구축합니다.',
          stories: [
            { title: '네트워크 트래픽 분석', description: 'Chrome DevTools로 API 엔드포인트 추출' },
            { title: '인증 플로우 이해', description: 'Instagram 로그인 및 토큰 관리 분석' },
          ],
        },
        {
          title: 'TypeScript SDK 구현',
          description: 'API 클라이언트를 TypeScript로 구현하고 타입 시스템을 활용합니다.',
          stories: [
            { title: 'API 클라이언트 설계', description: '타입 안전한 API 래퍼 구현' },
            { title: '에러 핸들링', description: 'Rate limiting 및 에러 처리 로직' },
          ],
        },
        {
          title: '고급 기능 구현',
          description: '미디어 업로드, 스레드 체이닝 등 고급 기능을 구현합니다.',
          stories: [
            { title: '미디어 업로드', description: '이미지/동영상 업로드 구현' },
            { title: '스레드 체이닝', description: '연속된 스레드 포스팅 기능' },
          ],
        },
      ],
    },
  },
  {
    session_id: 'sample-python-basics',
    course_title: 'Python 프로그래밍 기초',
    one_liner: 'Python의 기본 문법부터 실용적인 스크립트 작성까지',
    student_id: null,
    clerk_user_id: null,
    status: 'approved',
    total_hours: 30,
    total_tasks: 12,
    completed_tasks: 0,
    icon_id: 'python',
    structure: {
      epics: [
        {
          title: '개발 환경 설정',
          description: 'Python 설치 및 가상환경 구성',
          stories: [
            { title: 'Python 설치', description: 'pyenv로 Python 버전 관리하기' },
            { title: '가상환경 생성', description: 'venv로 프로젝트 환경 분리' },
          ],
        },
        {
          title: '기본 문법 학습',
          description: '변수, 자료형, 제어문 등 핵심 문법',
          stories: [
            { title: '변수와 자료형', description: '숫자, 문자열, 리스트, 딕셔너리' },
            { title: '조건문과 반복문', description: 'if, for, while 문 활용' },
            { title: '함수 정의', description: '함수 작성 및 모듈화' },
          ],
        },
        {
          title: '실전 프로젝트',
          description: '실용적인 Python 스크립트 작성',
          stories: [
            { title: '파일 처리', description: 'CSV, JSON 파일 읽기/쓰기' },
            { title: '웹 스크래핑', description: 'BeautifulSoup으로 데이터 수집' },
          ],
        },
      ],
    },
  },
  {
    session_id: 'sample-react-native',
    course_title: 'React Native 앱 개발',
    one_liner: 'React Native로 iOS/Android 크로스 플랫폼 앱 만들기',
    student_id: null,
    clerk_user_id: null,
    status: 'approved',
    total_hours: 40,
    total_tasks: 15,
    completed_tasks: 0,
    icon_id: 'react-native',
    structure: {
      epics: [
        {
          title: '개발 환경 구축',
          description: 'React Native CLI 설정 및 시뮬레이터 준비',
          stories: [
            { title: 'Node.js와 Watchman 설치', description: '필수 의존성 설치' },
            { title: 'Xcode/Android Studio 설정', description: '네이티브 빌드 도구 구성' },
          ],
        },
        {
          title: '핵심 컴포넌트',
          description: 'View, Text, Image 등 기본 컴포넌트 학습',
          stories: [
            { title: '레이아웃 시스템', description: 'Flexbox로 UI 배치하기' },
            { title: '스타일링', description: 'StyleSheet API 활용' },
            { title: '리스트 렌더링', description: 'FlatList와 SectionList' },
          ],
        },
        {
          title: '네비게이션과 상태관리',
          description: 'React Navigation과 상태 관리 패턴',
          stories: [
            { title: 'Stack Navigation', description: '화면 간 이동 구현' },
            { title: 'Tab Navigation', description: '하단 탭바 구현' },
            { title: 'Context API', description: '전역 상태 관리' },
          ],
        },
      ],
    },
  },
  {
    session_id: 'sample-nestjs',
    course_title: 'NestJS 백엔드 마스터',
    one_liner: 'NestJS로 엔터프라이즈급 Node.js 백엔드 구축하기',
    student_id: null,
    clerk_user_id: null,
    status: 'approved',
    total_hours: 35,
    total_tasks: 14,
    completed_tasks: 0,
    icon_id: 'nestjs',
    structure: {
      epics: [
        {
          title: 'NestJS 기초',
          description: '모듈, 컨트롤러, 서비스 구조 이해',
          stories: [
            { title: '프로젝트 생성', description: 'Nest CLI로 프로젝트 부트스트랩' },
            { title: '모듈 시스템', description: '의존성 주입과 모듈 구성' },
          ],
        },
        {
          title: 'REST API 개발',
          description: 'CRUD API와 유효성 검사',
          stories: [
            { title: 'DTO와 Pipes', description: 'class-validator로 입력 검증' },
            { title: '예외 처리', description: 'Exception Filters 활용' },
            { title: '인터셉터', description: '응답 변환과 로깅' },
          ],
        },
        {
          title: '데이터베이스 연동',
          description: 'TypeORM으로 DB 연동',
          stories: [
            { title: 'Entity 정의', description: '테이블 매핑과 관계 설정' },
            { title: 'Repository 패턴', description: 'CRUD 작업 추상화' },
            { title: '마이그레이션', description: '스키마 버전 관리' },
          ],
        },
      ],
    },
  },
  {
    session_id: 'sample-swiftui',
    course_title: 'SwiftUI 앱 개발',
    one_liner: 'SwiftUI로 현대적인 iOS 앱 인터페이스 구축하기',
    student_id: null,
    clerk_user_id: null,
    status: 'approved',
    total_hours: 35,
    total_tasks: 12,
    completed_tasks: 0,
    icon_id: 'swiftui',
    structure: {
      epics: [
        {
          title: 'SwiftUI 기초',
          description: '선언적 UI 프레임워크 기본 개념',
          stories: [
            { title: 'View 프로토콜', description: '기본 뷰 컴포넌트 이해' },
            { title: '레이아웃 시스템', description: 'HStack, VStack, ZStack' },
          ],
        },
        {
          title: '상태 관리',
          description: 'State, Binding, ObservableObject',
          stories: [
            { title: '@State와 @Binding', description: '로컬 상태 관리' },
            { title: '@ObservableObject', description: '복잡한 상태 패턴' },
            { title: '@EnvironmentObject', description: '전역 상태 공유' },
          ],
        },
        {
          title: '고급 UI 패턴',
          description: '네비게이션과 애니메이션',
          stories: [
            { title: 'NavigationStack', description: '화면 전환 구현' },
            { title: '애니메이션', description: 'withAnimation과 전환 효과' },
          ],
        },
      ],
    },
  },
  {
    session_id: 'sample-claude-agent',
    course_title: 'Claude AI 에이전트 개발',
    one_liner: 'Anthropic Claude API로 지능형 AI 에이전트 구축하기',
    student_id: null,
    clerk_user_id: null,
    status: 'approved',
    total_hours: 25,
    total_tasks: 10,
    completed_tasks: 0,
    icon_id: 'claude-agent',
    structure: {
      epics: [
        {
          title: 'Claude API 기초',
          description: 'Anthropic API 설정 및 기본 호출',
          stories: [
            { title: 'API 키 설정', description: '인증 및 환경변수 구성' },
            { title: 'Messages API', description: '대화 형식 요청/응답' },
          ],
        },
        {
          title: '고급 프롬프팅',
          description: '효과적인 프롬프트 엔지니어링',
          stories: [
            { title: '시스템 프롬프트', description: '에이전트 페르소나 정의' },
            { title: 'Few-shot 학습', description: '예시 기반 응답 유도' },
            { title: '체이닝 기법', description: '복잡한 작업 분해' },
          ],
        },
        {
          title: 'Tool Use 구현',
          description: 'Function calling으로 외부 도구 연동',
          stories: [
            { title: 'Tool 정의', description: 'JSON Schema로 도구 명세' },
            { title: 'Tool 실행', description: '도구 호출 및 결과 처리' },
          ],
        },
      ],
    },
  },
]

function generateTasks(curriculum: CurriculumDoc, curriculumId: ObjectId): TaskDoc[] {
  const tasks: TaskDoc[] = []
  let taskIndex = 0

  for (let epicIndex = 0; epicIndex < curriculum.structure.epics.length; epicIndex++) {
    const epic = curriculum.structure.epics[epicIndex]
    for (let storyIndex = 0; storyIndex < epic.stories.length; storyIndex++) {
      const story = epic.stories[storyIndex]
      taskIndex++
      tasks.push({
        _id: `${curriculum.session_id}-task-${String(taskIndex).padStart(3, '0')}`,
        curriculum_id: curriculumId,
        epic_index: epicIndex,
        story_index: storyIndex,
        epic_title: epic.title,
        story_title: story.title,
        title: story.title,
        description: story.description,
        acceptance_criteria: [
          { description: `${story.title} 구현 완료`, weight: 1 },
          { description: '코드가 정상적으로 동작함', weight: 1 },
        ],
        estimated_minutes: 30,
        status: 'pending',
        grade_result: null,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }
  }
  return tasks
}

async function main() {
  console.log('Connecting to MongoDB...')
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db(DB_NAME)

  console.log('\n--- Step 1: Disabling empty curricula ---')
  const disableResult = await db
    .collection('curricula')
    .updateMany(
      { _id: { $in: CURRICULA_TO_DISABLE.map((id) => new ObjectId(id)) } },
      { $set: { status: 'disabled', updated_at: new Date() } }
    )
  console.log(`Disabled ${disableResult.modifiedCount} curricula`)

  console.log('\n--- Step 2: Inserting sample curricula ---')
  for (const curriculumData of SAMPLE_CURRICULA) {
    const existing = await db.collection('curricula').findOne({ session_id: curriculumData.session_id })
    if (existing) {
      console.log(`  Skipping ${curriculumData.course_title} (already exists)`)
      continue
    }

    const curriculum: CurriculumDoc = {
      ...curriculumData,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = await db.collection('curricula').insertOne(curriculum)
    console.log(`  Inserted: ${curriculum.course_title} (${result.insertedId})`)

    const tasks = generateTasks(curriculum, result.insertedId)
    if (tasks.length > 0) {
      await db.collection('tasks').insertMany(tasks as unknown as Document[])
      console.log(`    -> Created ${tasks.length} tasks`)
    }
  }

  console.log('\n--- Step 3: Updating FastAPI curriculum with icon_id ---')
  await db
    .collection('curricula')
    .updateOne(
      { _id: new ObjectId('697e3f00b63c5d73c8671018') },
      { $set: { icon_id: 'python', updated_at: new Date() } }
    )
  console.log('  Updated FastAPI curriculum with icon_id: python')

  console.log('\n--- Final state ---')
  const curricula = await db
    .collection('curricula')
    .find({ status: { $ne: 'disabled' } })
    .toArray()
  console.log(`Active curricula: ${curricula.length}`)
  for (const c of curricula) {
    console.log(`  - ${c.course_title} (${c.icon_id || 'no icon'}) - ${c.total_tasks} tasks`)
  }

  await client.close()
  console.log('\nDone!')
}

main().catch(console.error)
