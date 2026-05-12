# 도서관 대출 관리 시스템

## 1. 시스템 소개

React로 구현한 정적 웹 기반 도서관 대출 관리 시스템입니다.  
사용자는 도서를 검색하고, 대출/반납 상태를 관리할 수 있습니다.

## 2. 주요 기능

- 도서 목록 조회
- 도서 검색 (제목 / 저자 / 카테고리)
- 대출 가능 / 대출 중 필터
- 대출 및 반납 처리 (버튼 클릭 시 즉시 반영)
- 현재 대출 목록 패널
- localStorage 기반 상태 저장 (새로고침 후에도 유지)
- 대출 현황 통계 (전체 도서 수, 대출 가능 도서 수, 대출 중 도서 수)

## 3. 사용 기술

- React
- Vite
- JavaScript
- CSS
- AWS S3
- GitHub Actions
- AWS Amplify

## 4. CI/CD 환경 (GitHub Actions → S3)

이 저장소는 **GitHub Actions**로 **React(Vite) 빌드 결과물**을 **AWS S3 정적 웹 사이트 호스팅** 버킷에 자동 배포합니다.

- **워크플로 파일:** `.github/workflows/deploy.yml`
- **트리거:** `main` 브랜치에 `push`될 때마다 워크플로가 실행됩니다.
- **빌드:** `npm install` → `npm run build` (산출물은 `dist/`)
- **배포:** `aws s3 sync ./dist s3://<버킷명> --delete` 로 동기화합니다. 버킷명은 **코드에 넣지 않고** GitHub Secrets의 `AWS_S3_BUCKET` 값을 사용합니다.
- **AWS Academy:** 임시 자격 증명을 사용하므로 `AWS_SESSION_TOKEN` Secret을 **반드시** 설정합니다.

### GitHub Secrets 등록 방법

GitHub 저장소 **Settings → Secrets and variables → Actions → New repository secret** 에서 아래 이름으로 등록합니다.  
**실제 액세스 키·시크릿·토큰·버킷명 값은 README나 코드에 적지 말고**, 각자 GitHub에만 저장합니다.

| Secret 이름 | 설명 |
|-------------|------|
| `AWS_ACCESS_KEY_ID` | AWS 액세스 키 ID |
| `AWS_SECRET_ACCESS_KEY` | AWS 시크릿 액세스 키 |
| `AWS_SESSION_TOKEN` | 세션 토큰 (AWS Academy 등) |
| `AWS_S3_BUCKET` | 정적 웹 사이트 호스팅에 사용하는 S3 버킷 이름 |
| `AWS_REGION` | 리전 (예: `us-east-1` — **기본 예시는 us-east-1**이며, 실제 버킷 리전과 일치하도록 설정) |

### AWS Amplify (선택)

동일 저장소를 Amplify Hosting에 연결할 경우, 루트의 `amplify.yml`을 빌드 스펙으로 사용할 수 있습니다.

**로컬 개발:** `npm install`, `npm run dev` / 프로덕션 산출물 확인: `npm run build`

## 5. 배포 URL

아래 항목에 **S3 정적 웹 사이트 호스팅**에서 확인한 URL을 붙여 넣습니다. (형식 예: `http://<버킷명>.s3-website-<리전>.amazonaws.com/` 등, 콘솔에 표시되는 주소 사용)

- **S3 정적 웹 사이트 URL:** `여기에 작성`
- Amplify URL(사용 시): `여기에 작성`

## 6. 시연 영상

- GitHub Actions CI/CD 시연 영상: `YouTube 링크 (제출 전 교체)`
- AWS Amplify 호스팅 시연 영상: `YouTube 링크 (제출 전 교체)`

---

작성자: 이하늘
