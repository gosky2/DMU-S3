# 도서관 대출 관리 시스템

## 시스템 소개

본 프로젝트는 **도서 목록 조회·검색·대출/반납·통계**를 한 화면에서 관리할 수 있는 **정적 웹 기반 도서관 대출 관리 시스템**입니다. 백엔드 없이 브라우저에서 동작하며, **생성형 AI(Cursor 등)의 도움을 받아** 요구사항을 정리한 뒤 **React**로 UI와 상태 관리 로직을 구현했습니다.

## 주요 기능

- 도서 목록 조회
- 제목·저자·카테고리 검색
- 대출 가능 / 대출 중 필터
- 대출하기·반납하기 (버튼 클릭 시 즉시 반영)
- 현재 대출 목록 패널
- 대출 현황 통계 카드 (전체·대출 가능·대출 중)
- **localStorage**에 도서 상태 저장 (새로고침 후에도 유지)
- 관리자 대시보드 스타일의 **반응형 UI**

## 사용 기술

- React
- Vite
- JavaScript
- CSS
- AWS S3
- GitHub Actions
- AWS Amplify

## Github Repository

https://github.com/gosky2/DMU-S3

## CI/CD 환경 소개

- **GitHub Actions**를 사용하여 **`main` 브랜치에 `push`될 때마다** 자동으로 의존성 설치·빌드·배포가 실행됩니다.
- 배포 대상은 **AWS S3 정적 웹 사이트 호스팅** 버킷입니다.
- AWS 액세스 키·리전·버킷명 등은 코드에 넣지 않고, **GitHub Repository Secrets**로만 전달합니다. (AWS Academy 등 **임시 자격 증명** 사용 시 `AWS_SESSION_TOKEN`도 Secret으로 설정합니다.)

## AWS 배포 URL

**S3 정적 웹 사이트 엔드포인트 URL**을 아래에 기입합니다. (AWS 콘솔 → S3 → 해당 버킷 → **속성** → **정적 웹 사이트 호스팅**에서 확인)

```
(여기에 본인 S3 웹사이트 URL 붙여넣기)
```

> 과제 제출 시 위 한 줄을 실제 URL로 교체하세요. 예시 형식: `http://<버킷명>.s3-website-<리전>.amazonaws.com/` (리전·엔드포인트 표기는 콘솔 안내를 따릅니다.)

## Github Actions Workflow 설명

워크플로 파일: `.github/workflows/deploy.yml`

1. **`npm install`**: 패키지 의존성 설치  
2. **`npm run build`**: Vite로 프로덕션 빌드 실행  
3. **`dist` 폴더 생성**: 정적 파일(`index.html`, JS/CSS 등)이 `dist/`에 출력됨  
4. **`aws s3 sync ./dist s3://${{ secrets.AWS_S3_BUCKET }} --delete`**: `dist` 내용을 S3 버킷과 동기화(삭제 포함)하여 자동 업로드

## 프로젝트 구조

```
.
├── .github/workflows/deploy.yml   # GitHub Actions 배포 워크플로
├── amplify.yml                    # AWS Amplify 연동 시 빌드 스펙(선택)
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── App.jsx
    ├── App.css
    ├── main.jsx
    ├── index.css
    ├── components/
    │   ├── BookTable.jsx
    │   ├── StatsCards.jsx
    │   └── Toolbar.jsx
    └── data/
        ├── books.js               # 초기 샘플 도서 데이터
        └── storage.js             # localStorage 읽기/쓰기
```

## 실행 방법

```bash
npm install
npm run dev
```

프로덕션 빌드만 확인할 때:

```bash
npm run build
npm run preview
```

---

작성자: 이하늘
