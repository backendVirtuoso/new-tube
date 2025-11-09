<div align="center">

# 🎥 NewTube

### Enterprise-Grade Video Streaming Platform

프로덕션 수준의 아키텍처로 구현한 YouTube 클론 프로젝트

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![tRPC](https://img.shields.io/badge/tRPC-11.0-2596BE?logo=trpc)](https://trpc.io/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.39-C5F74F?logo=drizzle)](https://orm.drizzle.team/)

[Demo](#) · [Documentation](#getting-started) · [Architecture](#-architecture-highlights)

</div>

---

## 📋 Table of Contents

- [Why This Project Stands Out](#-why-this-project-stands-out)
- [Technical Highlights](#-technical-highlights)
- [Architecture](#-architecture-highlights)
- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Performance Optimization](#-performance-optimization)
- [What I Learned](#-what-i-learned)

---

## 🌟 Why This Project Stands Out

실무에서 바로 활용 가능한 수준의 **프로덕션 레디** 아키텍처를 구현했습니다:

### 🎯 Problem-Solving Approach

- **타입 안정성**: tRPC로 프론트엔드-백엔드 간 완전한 타입 안정성 확보
- **확장 가능한 아키텍처**: 모듈 기반 설계로 기능 확장이 용이한 구조
- **실시간 비디오 처리**: Mux 통합으로 adaptive bitrate streaming 구현
- **비동기 워크플로우**: Upstash Workflow로 복잡한 비동기 작업 처리
- **데이터베이스 최적화**: 효율적인 쿼리와 인덱싱 전략

### 💡 Real-World Solutions

```typescript
// 무한 스크롤 + 커서 기반 페이지네이션 (N+1 문제 해결)
cursor: z.object({
  id: z.string().uuid(),
  updatedAt: z.date(),
}).nullish()

// Rate Limiting으로 API 남용 방지
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "10s"),
});

// 복잡한 관계형 데이터를 효율적으로 조회
.select({
  ...getTableColumns(videos),
  viewCount: db.$count(videoViews, eq(videoViews.videoId, videos.id)),
  likeCount: db.$count(videoReactions, and(...)),
})
```

---

## 🚀 Technical Highlights

### 1. 🏗️ Type-Safe Full-Stack Architecture

**tRPC + Zod**를 활용해 프론트엔드에서 백엔드까지 **완전한 타입 안정성**을 확보했습니다.

```typescript
// ✅ 타입 에러를 컴파일 타임에 잡아냄
const { data } = api.videos.getOne.useQuery({ id: videoId });
// data는 자동으로 Video 타입으로 추론됨
```

- **런타임 검증**: Zod 스키마로 입력값 검증
- **자동 완성**: IDE에서 완벽한 IntelliSense 지원
- **리팩토링 안정성**: 타입 변경 시 모든 사용처에서 에러 발생

### 2. 🎬 Professional Video Streaming

**Mux**를 통합하여 엔터프라이즈급 비디오 스트리밍 구현:

- **Adaptive Bitrate Streaming**: 네트워크 상태에 따라 자동 화질 조정
- **자동 자막 생성**: AI 기반 실시간 자막 생성
- **썸네일 자동 생성**: 비디오에서 자동으로 썸네일 추출
- **Webhook 처리**: 비디오 인코딩 완료 시 자동 알림

### 3. 🧩 Modular Architecture

**도메인 주도 설계(DDD)** 원칙을 적용한 모듈 구조:

```
modules/
├── videos/
│   ├── server/          # tRPC procedures
│   ├── ui/              # React components
│   │   ├── components/  # Reusable components
│   │   ├── sections/    # Page sections
│   │   └── views/       # Full page views
│   └── types.ts         # Shared types
├── playlists/
├── subscriptions/
└── ...
```

**장점**:
- 🔄 독립적인 모듈 개발 및 테스트
- 📦 기능별 코드 응집도 향상
- 🚀 새로운 기능 추가 용이

### 4. 🗄️ Advanced Database Design

**Drizzle ORM**으로 타입 안전한 데이터베이스 쿼리:

```typescript
// 복잡한 조인과 집계를 타입 안전하게
const data = await db
  .select({
    ...getTableColumns(videos),
    viewCount: db.$count(videoViews, eq(videoViews.videoId, videos.id)),
    likeCount: db.$count(videoReactions, and(...)),
    user: users,
  })
  .from(videos)
  .innerJoin(users, eq(videos.userId, users.id))
  .where(...)
  .orderBy(desc(videos.updatedAt));
```

**특징**:
- 자체 참조 관계 (Self-referencing): 댓글의 답글 구조
- 복합 Primary Key: 다대다 관계 효율적 관리
- Cascade 삭제: 데이터 무결성 보장
- 인덱싱 전략: 쿼리 성능 최적화

### 5. ⚡ Performance Optimizations

#### 무한 스크롤 최적화
```typescript
// Intersection Observer API 활용
const { ref, entry } = useIntersectionObserver({
  threshold: 0,
  root: null,
  rootMargin: '100px',
});

// 커서 기반 페이지네이션으로 성능 보장
if (entry?.isIntersecting && hasNextPage) {
  fetchNextPage();
}
```

#### Rate Limiting
```typescript
// Sliding Window 알고리즘으로 정교한 Rate Limiting
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "10s"),
});
```

### 6. 🔐 Security & Authentication

- **Clerk 통합**: 소셜 로그인, 2FA, 세션 관리
- **Protected Routes**: Middleware 기반 경로 보호
- **Webhook 검증**: Svix로 webhook 서명 검증
- **Input Validation**: Zod 스키마로 모든 입력값 검증

---

## 🏛️ Architecture Highlights

### Clean Architecture Principles

```
┌─────────────────────────────────────────┐
│          Presentation Layer             │
│    (React Components, UI Logic)         │
├─────────────────────────────────────────┤
│          Application Layer              │
│       (tRPC Procedures, Hooks)          │
├─────────────────────────────────────────┤
│           Domain Layer                  │
│     (Business Logic, Types)             │
├─────────────────────────────────────────┤
│        Infrastructure Layer             │
│   (Database, External APIs, Redis)      │
└─────────────────────────────────────────┘
```

### Data Flow

```
User Action → React Component → tRPC Client
                                      ↓
                                tRPC Procedure
                                      ↓
                              Business Logic
                                      ↓
                            Drizzle ORM Query
                                      ↓
                              PostgreSQL DB
                                      ↓
                              Response Data
                                      ↓
                            React Query Cache
                                      ↓
                                  UI Update
```

---

## ✨ Core Features

### 🎥 Video Management
- ✅ 비디오 업로드 with 드래그 앤 드롭
- ✅ 실시간 인코딩 진행 상태 표시
- ✅ Adaptive bitrate streaming (HLS)
- ✅ 화질 선택 (Auto, 1080p, 720p, 480p, 360p)
- ✅ 자동 썸네일 생성
- ✅ 비디오 미리보기
- ✅ Public/Private 공개 설정

### 🤖 AI-Powered Features
- ✅ OpenAI 기반 제목 자동 생성
- ✅ 영상 설명 자동 생성
- ✅ 자동 자막 생성 및 편집

### 👥 Social Features
- ✅ 구독/구독 취소
- ✅ 좋아요/싫어요 시스템
- ✅ 댓글 및 답글 (Nested Comments)
- ✅ 댓글 좋아요/싫어요
- ✅ 사용자 프로필 페이지
- ✅ 구독자 수 표시

### 📊 Creator Studio
- ✅ 업로드한 비디오 목록
- ✅ 비디오별 통계 (조회수, 좋아요, 댓글)
- ✅ 비디오 편집 (제목, 설명, 썸네일)
- ✅ 비디오 삭제
- ✅ 실시간 인코딩 상태 확인

### 🗂️ Playlist Management
- ✅ 재생목록 생성/수정/삭제
- ✅ 비디오 추가/제거
- ✅ 재생목록 공유
- ✅ 자동 재생 기능

### 🔍 Search & Discovery
- ✅ 실시간 검색
- ✅ 카테고리별 필터링
- ✅ 추천 비디오 알고리즘
- ✅ 구독 피드
- ✅ 최신/인기 비디오 피드

### 📱 Responsive Design
- ✅ 모바일 최적화
- ✅ 태블릿 지원
- ✅ 다크 모드 (차후 구현 가능)
- ✅ 접근성 (Accessibility) 고려

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: TailwindCSS 4
- **Component Library**: shadcn/ui (Radix UI)
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend
- **API Layer**: tRPC 11
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (Neon DB)
- **Authentication**: Clerk
- **File Upload**: UploadThing
- **Video Processing**: Mux
- **Cache/Queue**: Upstash Redis
- **Workflows**: Upstash Workflow
- **Rate Limiting**: Upstash Ratelimit

### AI & External Services
- **AI Model**: OpenAI GPT-4
- **Video CDN**: Mux
- **Webhook Management**: Svix

### Development Tools
- **Package Manager**: Bun (or npm)
- **Linting**: ESLint
- **Database Migrations**: Drizzle Kit
- **Development**: Concurrently, ngrok

---

## 🗃️ Database Schema

### Core Tables

```sql
users
├─ id (PK)
├─ clerkId (unique)
├─ name
├─ imageUrl
├─ bannerUrl
└─ timestamps

videos
├─ id (PK)
├─ userId (FK → users)
├─ categoryId (FK → categories)
├─ title
├─ description
├─ muxAssetId
├─ muxPlaybackId
├─ thumbnailUrl
├─ duration
├─ visibility (enum)
└─ timestamps

subscriptions
├─ viewerId (FK → users)
├─ creatorId (FK → users)
└─ timestamps
└─ PK: (viewerId, creatorId)

video_views
├─ userId (FK → users)
├─ videoId (FK → videos)
└─ timestamps
└─ PK: (userId, videoId)

video_reactions
├─ userId (FK → users)
├─ videoId (FK → videos)
├─ type (enum: like/dislike)
└─ timestamps
└─ PK: (userId, videoId)

comments
├─ id (PK)
├─ parentId (FK → comments) [self-reference]
├─ userId (FK → users)
├─ videoId (FK → videos)
├─ value
└─ timestamps

playlists
├─ id (PK)
├─ userId (FK → users)
├─ name
├─ description
└─ timestamps

playlist_videos
├─ playlistId (FK → playlists)
├─ videoId (FK → videos)
└─ timestamps
└─ PK: (playlistId, videoId)
```

### Key Design Decisions

1. **복합 Primary Key**: 다대다 관계에서 중복 방지 및 쿼리 최적화
2. **자체 참조**: 댓글의 답글 구조 (parentId → comments.id)
3. **Cascade 삭제**: 데이터 무결성 자동 보장
4. **Enum 타입**: 타입 안정성 및 데이터 일관성
5. **UUID**: 분산 시스템 확장성 고려

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 또는 Bun 1.0+
- PostgreSQL 또는 Neon DB 계정
- 아래 서비스 계정 (모두 무료 티어 사용 가능):
  - [Mux](https://mux.com/) - 비디오 스트리밍
  - [OpenAI](https://platform.openai.com/) - AI 기능
  - [Upstash](https://upstash.com/) - Redis & Workflows
  - [Clerk](https://clerk.com/) - 인증
  - [UploadThing](https://uploadthing.com/) - 파일 업로드

### Installation

```bash
# 1. 저장소 클론
git clone https://github.com/yourusername/new-tube.git
cd new-tube

# 2. 의존성 설치 (Bun 권장)
bun install
# 또는 npm을 사용하는 경우
npm install --legacy-peer-deps

# 3. 환경 변수 설정
cp .env.example .env
```

### Environment Variables

`.env` 파일에 다음 내용을 설정하세요:

```env
# Database (Neon DB 또는 로컬 PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database

# Global
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Mux (비디오 처리)
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret
MUX_WEBHOOK_SECRET=your_mux_webhook_secret

# OpenAI (AI 기능)
OPENAI_API_KEY=sk-...

# Upstash (Redis & Workflows)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
UPSTASH_WORKFLOW_URL=https://...
QSTASH_TOKEN=...

# Clerk (인증)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_SIGNING_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# UploadThing (파일 업로드)
UPLOADTHING_TOKEN=...
```

### Database Setup

```bash
# 데이터베이스 마이그레이션 & 카테고리 시드
bun run src/scripts/seed-categories.ts
# 또는
tsx src/scripts/seed-categories.ts
```

### Run Development Server

```bash
# Webhook tunneling과 함께 개발 서버 실행
bun run dev:all

# 또는 개발 서버만 실행
bun run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

---

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # 인증 관련 페이지 그룹
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (home)/              # 메인 페이지 그룹
│   │   ├── feed/
│   │   ├── playlists/
│   │   ├── search/
│   │   ├── subscriptions/
│   │   ├── users/
│   │   └── videos/
│   ├── (studio)/            # 크리에이터 스튜디오
│   │   └── studio/
│   └── api/                 # API Routes
│       ├── trpc/            # tRPC handler
│       ├── uploadthing/     # 파일 업로드
│       ├── users/           # Webhook handlers
│       └── videos/          # Webhook handlers
│
├── components/              # 공유 컴포넌트
│   └── ui/                  # shadcn/ui 컴포넌트
│
├── modules/                 # 도메인별 모듈 (핵심!)
│   ├── videos/
│   │   ├── server/          # tRPC procedures
│   │   ├── ui/              # React components
│   │   └── types.ts
│   ├── playlists/
│   ├── subscriptions/
│   ├── comments/
│   ├── studio/
│   └── ...
│
├── db/
│   ├── index.ts             # Drizzle 클라이언트
│   └── schema.ts            # 데이터베이스 스키마
│
├── lib/                     # 유틸리티 & 설정
│   ├── mux.ts               # Mux 클라이언트
│   ├── ratelimit.ts         # Rate limiting
│   ├── redis.ts             # Redis 클라이언트
│   ├── workflow.ts          # Upstash Workflow
│   └── utils.ts
│
├── trpc/                    # tRPC 설정
│   ├── init.ts              # tRPC 초기화
│   ├── routers/
│   │   └── _app.ts          # Root router
│   ├── client.tsx           # 클라이언트 설정
│   └── server.tsx           # 서버 설정
│
├── hooks/                   # 커스텀 React Hooks
│
└── middleware.ts            # Next.js 미들웨어 (인증)
```

### 모듈 구조 (예: videos 모듈)

```
modules/videos/
├── server/
│   └── procedures.ts        # tRPC procedures (API endpoints)
├── ui/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── video-card.tsx
│   │   ├── video-player.tsx
│   │   └── video-upload.tsx
│   ├── sections/            # 페이지 섹션
│   │   ├── video-details-section.tsx
│   │   └── related-videos-section.tsx
│   └── views/               # 전체 페이지 뷰
│       └── video-page.tsx
├── types.ts                 # 공유 타입
└── constants.ts             # 상수
```

---

## ⚡ Performance Optimization

### 1. Cursor-Based Pagination

오프셋 페이지네이션 대신 **커서 기반 페이지네이션**으로 대량 데이터에서도 일관된 성능 보장:

```typescript
// ❌ 오프셋 방식 (느림)
.offset(page * limit)
.limit(limit)

// ✅ 커서 방식 (빠름)
.where(or(
  lt(videos.updatedAt, cursor.updatedAt),
  and(
    eq(videos.updatedAt, cursor.updatedAt),
    lt(videos.id, cursor.id)
  )
))
.limit(limit + 1)
```

### 2. Infinite Scroll

Intersection Observer API로 효율적인 무한 스크롤 구현:

```typescript
const { ref, entry } = useIntersectionObserver({
  threshold: 0,
  rootMargin: '100px',  // 미리 로딩
});

useEffect(() => {
  if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}, [entry]);
```

### 3. React Query Optimistic Updates

낙관적 업데이트로 사용자 경험 향상:

```typescript
const mutation = api.videoReactions.toggle.useMutation({
  onMutate: async (variables) => {
    // 즉시 UI 업데이트
    await queryClient.cancelQueries();
    const prev = queryClient.getQueryData(queryKey);
    queryClient.setQueryData(queryKey, (old) => ({
      ...old,
      hasLiked: !old.hasLiked,
      likeCount: old.hasLiked ? old.likeCount - 1 : old.likeCount + 1,
    }));
    return { prev };
  },
  onError: (_, __, context) => {
    // 실패 시 롤백
    queryClient.setQueryData(queryKey, context.prev);
  },
});
```

### 4. Database Query Optimization

- **인덱싱**: clerk_id, name 등 자주 조회되는 컬럼에 인덱스 추가
- **N+1 문제 해결**: Join으로 단일 쿼리로 변환
- **Count 최적화**: db.$count로 효율적인 집계

### 5. Rate Limiting

Sliding Window 알고리즘으로 API 남용 방지:

```typescript
const { success, remaining } = await ratelimit.limit(userId);
if (!success) {
  throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
}
```

---

## 🎓 What I Learned

### Technical Skills

1. **Type-Safe Development**
   - tRPC를 통한 end-to-end 타입 안정성 구현
   - Zod 스키마로 런타임 검증과 타입 추론 동시 달성
   - Drizzle ORM으로 SQL과 타입스크립트의 완벽한 조화

2. **Scalable Architecture**
   - 모듈 기반 설계로 코드 응집도 향상
   - Clean Architecture 원칙 적용
   - 도메인 주도 설계(DDD) 실전 적용

3. **Real-Time Video Processing**
   - Mux를 통한 Adaptive Bitrate Streaming 구현
   - Webhook 기반 비동기 작업 처리
   - 대용량 파일 업로드 최적화

4. **Database Design**
   - 복잡한 관계형 데이터 모델링
   - 인덱싱 전략 수립 및 쿼리 최적화
   - 데이터 무결성 보장 (Cascade, Foreign Key)

5. **Performance Optimization**
   - 커서 기반 페이지네이션으로 성능 개선
   - React Query로 효율적인 상태 관리
   - 무한 스크롤 최적화

### Soft Skills

- 복잡한 요구사항을 작은 단위로 분해하는 능력
- 확장 가능한 아키텍처 설계 능력
- 트레이드오프 고려 및 의사결정 능력
- 문서화와 코드 가독성의 중요성

---

## 🔮 Future Enhancements

- [ ] 실시간 알림 시스템 (WebSocket)
- [ ] 라이브 스트리밍 기능
- [ ] 커뮤니티 탭 (게시물, 투표)
- [ ] 고급 검색 필터 (날짜, 재생시간, 정렬)
- [ ] 콘텐츠 추천 알고리즘 개선 (협업 필터링)
- [ ] 다국어 지원 (i18n)
- [ ] PWA 지원 (오프라인 모드)
- [ ] 분석 대시보드 확장 (Google Analytics 통합)

---

## 📝 License

This project is created for educational and portfolio purposes.

---

## 👨‍💻 Author

**[Your Name]**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourname)
- Email: your.email@example.com

---

<div align="center">

### 🌟 If you found this project interesting, please consider giving it a star!

Made with ❤️ and ☕ by [Your Name]

</div>
