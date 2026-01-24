# CROWNY - Global Business Platform

전 세계를 하나의 웹사이트에서 관리하는 사업 플랫폼

## 기술 스택

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js (Credentials)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

```bash
cp .env.example .env
# .env 파일에서 DATABASE_URL, NEXTAUTH_SECRET 수정
```

### 3. DB 마이그레이션

```bash
npx prisma migrate dev --name init
```

### 4. 시드 데이터

```bash
npm run db:seed
```

### 5. 개발 서버 실행

```bash
npm run dev
```

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   ├── auth/         # 인증 API (NextAuth, 회원가입)
│   │   ├── countries/    # 국가 조회 API
│   │   ├── enterprises/  # 기업 CRUD API
│   │   └── industries/   # 산업 조회 API
│   ├── (auth)/
│   │   ├── login/        # 로그인 페이지
│   │   └── register/     # 회원가입 페이지
│   ├── dashboard/        # 대시보드
│   ├── enterprises/      # 기업 목록/상세/등록
│   └── page.tsx          # 랜딩 페이지
├── components/           # 공통 컴포넌트
└── lib/                  # 유틸리티 (Prisma, Auth 설정)
```

## MVP 기능

- 회원가입/로그인 (역할 선택: Admin, Business, Investor)
- 기업 등록/목록/상세 (CRUD)
- 내 대시보드
- 국가/산업 필터
