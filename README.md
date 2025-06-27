# YouTube Clone

![thumbnail](https://img.youtube.com/vi/ArmPzvHTcfQ/maxresdefault.jpg)

Next.js, Drizzle ORM, 최신 UI 라이브러리들로 제작된 현대적인 유튜브 클론입니다.
고급 영상 처리, 실시간 자막 생성, 반응형 디자인 등 **실제 서비스에 가까운 기능들을 직접 구현해볼 수 있습니다**.

## Key Features

-	🎥 화질 선택이 가능한 고급 비디오 플레이어
-	🎬 Mux를 활용한 실시간 영상 처리
-	📝 자동 자막 생성 기능
-	🖼️ 영상 기반 썸네일 자동 생성
-	🤖 AI 기반 제목 및 설명 자동 생성
-	📊 조회수, 좋아요, 트래픽을 확인할 수 있는 크리에이터 스튜디오
-	🗂️ 사용자 맞춤 재생목록 관리 기능
-	📱 모든 기기에 최적화된 반응형 디자인
-	🔄 여러 개의 콘텐츠 피드 구성
-	💬 댓글 및 답글을 포함한 인터랙티브한 댓글 시스템
-	👍 좋아요 및 구독 시스템
-	🎯 개인별 시청 기록 추적
-	🔐 완성도 높은 사용자 인증 시스템
-	📦 모듈 기반의 구조적 설계
-	🗄️ DrizzleORM 기반 PostgreSQL 연동
-	🚀 Next.js 15 & React 19 기반 최신 스택
-	🔄 완전한 타입 안정성을 보장하는 tRPC 기반 API
-	💅 TailwindCSS와 ShadcnUI를 활용한 세련된 UI 구성

## 필수 요구사항

-	Node.js 18 이상 또는 Bun 1.0 이상
-	PostgreSQL 혹은 NeonDB 계정
-	Mux 계정 – 실시간 영상 처리에 사용
-	OpenAI API Key – AI 기반 제목/설명 생성 기능에 필요
-	Upstash 계정 – Redis 및 워크플로우 기능에 필요
-	Clerk 계정 – 사용자 인증 시스템 구현을 위해 필요

## Getting Started

### Installation

#### Using Bun (Recommended)

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
```

#### Using npm

```bash
# Install dependencies
npm install
# If you get errors try
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env
```

### Environment Variables

`.env` 파일을 다음과 같이 설정하세요:

```env
# Database
DATABASE_URL=your_postgres_url

# Global
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Mux (Video Processing)
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret
MUX_WEBHOOK_SECRET=your_mux_webhook_secret

# OpenAI (AI Features)
OPENAI_API_KEY=your_openai_api_key

# Upstash (Redis & Workflows)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
UPSTASH_WORKFLOW_URL=your_upstash_workflow_url
QSTASH_TOKEN=your_qstash_token

# Clerk (Authentication)
CLERK_SIGNING_SECRET=your_clerk_signing_secret
```

### Database Setup

```bash
# Using Bun
bun run src/scripts/seed-categories.ts
# Using TSX
tsx src/scripts/seed-categories.ts
```

### Development

```bash
# Using Bun
bun run dev:all

# Using npm
npm run dev:all
```

브라우저에서 [http://localhost:3000](http://localhost:3000)로 접속하여 결과를 확인하세요.

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `dev:all` - Start dev server and webhook tunnel (for local Stripe/webhooks)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [UploadThing](https://uploadthing.com/)
- [Mux Video](https://mux.com/)
- [Clerk Auth](https://clerk.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Upstash](https://upstash.com/)
